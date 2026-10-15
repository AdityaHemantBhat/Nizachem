import { useEffect, useState } from 'react'
import { getOpenStatus } from '@/lib/hours'

/** Live open/closed line, computed after mount so prerendered HTML stays neutral. */
export function useOpenStatus() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    setStatus(getOpenStatus())
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  return status
}
