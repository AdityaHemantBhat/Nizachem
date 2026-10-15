import { useState } from 'react'

/**
 * Renders /photos/<file> with modern WebP support, fallback, and high-end skeleton shimmer loader.
 * Pass ratio={null} to fill a sized parent instead of setting an aspect ratio.
 */
export function Photo({
  photo,
  ratio = '4 / 5',
  arch = false,
  priority = false,
  sizes = '100vw',
  className = '',
  imgClassName = '',
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(!photo?.file)

  const ratioStyle = ratio
    ? (() => {
        const [w, h] = ratio.split('/').map((n) => Number(n.trim()))
        return { aspectRatio: ratio, width: 1200, height: Math.round((1200 * h) / w) }
      })()
    : null

  const width = ratioStyle?.width ?? 1200
  const height = ratioStyle?.height ?? 1500

  const rawFile = photo?.file || ''
  const baseName = rawFile.replace(/\.(jpg|jpeg|png)$/i, '')
  const webpFile = baseName ? `${baseName}.webp` : ''

  return (
    <div
      className={`relative isolate overflow-hidden border border-ink/12 bg-cream-deep ${
        arch ? '[clip-path:url(#arch-clip)]' : ''
      } ${className}`}
      style={ratioStyle ? { aspectRatio: ratioStyle.aspectRatio } : undefined}
    >
      {/* High-end Skeleton Shimmer Placeholder */}
      {!loaded && !failed && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 overflow-hidden bg-cream-deep/90 flex items-center justify-center pointer-events-none"
        >
          {/* Shimmer light sweep */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          {/* Subtle spinner indicator */}
          <div className="relative size-7 rounded-full border-2 border-ink/10 border-t-chilli/60 animate-spin opacity-40" />
        </div>
      )}

      {failed ? (
        <div className="absolute inset-0 grid place-items-center p-4 text-center">
          <div className="space-y-1.5">
            <p className="kicker text-ink-soft/90">{photo?.label ?? 'Photo'}</p>
            <p className="text-[0.68rem] tracking-wide text-ink-soft/55">
              add /public/photos/{photo?.file ?? 'photo.jpg'}
            </p>
          </div>
        </div>
      ) : (
        <picture className="contents">
          {webpFile && (
            <source type="image/webp" srcSet={`/photos/${webpFile}`} />
          )}
          <img
            src={`/photos/${photo.file}`}
            alt={photo.alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
          />
        </picture>
      )}
    </div>
  )
}

export default Photo
