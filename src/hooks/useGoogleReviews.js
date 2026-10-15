import { useEffect, useState } from 'react'
import { site } from '@/content/site'

const CACHE_KEY = 'nizachem_google_stats_cache'
const CACHE_REVIEWS_KEY = 'nizachem_google_reviews_list_cache'
const CACHE_TTL = 1000 * 60 * 30 // 30 minutes cache

export function useGoogleReviews() {
  const widgetId = import.meta.env.VITE_GOOGLE_REVIEWS_WIDGET_ID || site.reviews?.widgetId
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || site.googlePlaceId

  const [reviews, setReviews] = useState(site.reviews.items)
  const [rating, setRating] = useState(site.reviews.rating || 5.0)
  const [reviewCount, setReviewCount] = useState(site.reviews.count || 12)
  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(false)

  // 1. Listen for real-time live events dispatched by widget interceptor
  useEffect(() => {
    const handleStatsUpdate = (e) => {
      if (e?.detail) {
        if (typeof e.detail.count === 'number' && e.detail.count > 0) {
          setReviewCount(e.detail.count)
        }
        if (typeof e.detail.rating === 'number' && e.detail.rating > 0) {
          setRating(e.detail.rating)
        }
        setIsLive(true)
      }
    }

    window.addEventListener('nizachem-reviews-count', handleStatsUpdate)
    return () => window.removeEventListener('nizachem-reviews-count', handleStatsUpdate)
  }, [])

  // 2. Fetch live Google Maps rating, count & reviews dynamically via widget API
  useEffect(() => {
    let isMounted = true

    // Check localStorage cache for instant UI rendering
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { count, rating: cachedRating, timestamp } = JSON.parse(cached)
        if (count) setReviewCount(count)
        if (cachedRating) setRating(cachedRating)
        if (Date.now() - timestamp < CACHE_TTL) {
          setIsLive(true)
        }
      }

      const cachedReviews = localStorage.getItem(CACHE_REVIEWS_KEY)
      if (cachedReviews) {
        const parsedReviews = JSON.parse(cachedReviews)
        if (Array.isArray(parsedReviews) && parsedReviews.length > 0) {
          setReviews(parsedReviews)
        }
      }
    } catch {
      // Ignore storage errors
    }

    // Dynamic fetch from Elfsight backend (free, real-time Google listing sync)
    if (widgetId) {
      const fetchLiveStats = async () => {
        try {
          const bootRes = await fetch(`https://core.service.elfsight.com/p/boot/?w=${encodeURIComponent(widgetId)}`)
          if (!bootRes.ok) return
          const bootData = await bootRes.json()
          const widget = bootData?.data?.widgets?.[widgetId]
          const token = widget?.data?.public_widget_token
          const uri = widget?.data?.settings?.sources?.[0]?.url || placeId || 'ChIJd-pV4qKxvzsRssj_EFYl17Q'

          if (token && uri) {
            // Fetch live rating and review count
            const sourcesRes = await fetch(
              `https://service-reviews-ultimate.elfsight.com/data/sources?uris[]=${encodeURIComponent(uri)}`,
              {
                headers: {
                  Accept: 'application/json',
                  'x-widget-token': token,
                },
              },
            )

            if (sourcesRes.ok) {
              const sourcesData = await sourcesRes.json()
              const source = sourcesData?.result?.data?.[0]
              if (source && isMounted) {
                const liveCount = source.reviews_number
                const liveRating = source.rating

                if (typeof liveCount === 'number' && liveCount > 0) {
                  setReviewCount(liveCount)
                }
                if (typeof liveRating === 'number' && liveRating > 0) {
                  setRating(liveRating)
                }
                setIsLive(true)

                try {
                  localStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({
                      count: liveCount,
                      rating: liveRating,
                      timestamp: Date.now(),
                    }),
                  )
                } catch {}
              }
            }

            // Fetch live real reviews text, authors and photos
            const reviewsRes = await fetch(
              `https://service-reviews-ultimate.elfsight.com/data/reviews?uris[]=${encodeURIComponent(uri)}`,
              {
                headers: {
                  Accept: 'application/json',
                  'x-widget-token': token,
                },
              },
            )

            if (reviewsRes.ok) {
              const reviewsData = await reviewsRes.json()
              const rawList = reviewsData?.result?.data || []
              const realReviews = rawList
                .filter((r) => r.text && r.text.trim().length > 0)
                .map((r) => {
                  const nameParts = (r.reviewer_name || 'Verified Diner').trim().split(/\s+/)
                  const initials =
                    nameParts.length > 1
                      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
                      : nameParts[0].slice(0, 2).toUpperCase()

                  return {
                    author: r.reviewer_name,
                    initials,
                    photo: r.reviewer_picture_url || null,
                    rating: r.rating || 5,
                    quote: r.text.trim(),
                    time: r.published_at
                      ? new Date(r.published_at * 1000).toLocaleDateString('en-IN', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'Recently',
                    authorUrl: r.url || site.mapsUrl,
                    verified: true,
                    isRealGoogleReview: true,
                  }
                })

              if (realReviews.length > 0 && isMounted) {
                const merged = [
                  ...realReviews,
                  ...site.reviews.items.filter(
                    (item) => !realReviews.some((r) => r.author.toLowerCase() === item.author.toLowerCase()),
                  ),
                ]
                setReviews(merged)

                try {
                  localStorage.setItem(CACHE_REVIEWS_KEY, JSON.stringify(merged))
                } catch {}
              }
            }
          }
        } catch {
          // Fallback gracefully to site.js values
        }
      }

      fetchLiveStats()
    }

    // Optional GCP Places Library fallback if API key configured
    if (apiKey && placeId) {
      setLoading(true)
      const loadScript = () => {
        if (window.google?.maps?.places) {
          fetchPlaceDetails()
          return
        }

        const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
        if (existingScript) {
          existingScript.addEventListener('load', fetchPlaceDetails)
          return
        }

        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`
        script.async = true
        script.defer = true
        script.onload = () => {
          if (isMounted) fetchPlaceDetails()
        }
        script.onerror = () => {
          if (isMounted) setLoading(false)
        }
        document.head.appendChild(script)
      }

      const fetchPlaceDetails = () => {
        try {
          const dummyDiv = document.createElement('div')
          const service = new window.google.maps.places.PlacesService(dummyDiv)

          service.getDetails(
            {
              placeId,
              fields: ['name', 'rating', 'reviews', 'user_ratings_total'],
            },
            (place, status) => {
              if (!isMounted) return

              if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                if (place.user_ratings_total) setReviewCount(place.user_ratings_total)
                if (place.rating) setRating(place.rating)
                setIsLive(true)
              }
              setLoading(false)
            },
          )
        } catch {
          if (isMounted) setLoading(false)
        }
      }

      loadScript()
    }

    return () => {
      isMounted = false
    }
  }, [widgetId, apiKey, placeId])

  return { reviews, rating, reviewCount, isLive, loading }
}

export default useGoogleReviews
