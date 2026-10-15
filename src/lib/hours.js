import { site } from '@/content/site'

const OPEN_HOUR = 19
const CLOSE_HOUR = 23

/**
 * Live "open now" line, derived from the hours in site.js.
 * Computed on the client so prerendered HTML never bakes in build-time clock.
 */
export function getOpenStatus(now = new Date()) {
  const index = (now.getDay() + 6) % 7
  const today = site.hours[index]
  const nextOpen = site.hours[(index + 1) % 7]
  const time = now.getHours() + now.getMinutes() / 60

  if (today.closed) {
    return { open: false, label: `Closed today — open ${nextOpen.day} at 7 pm` }
  }
  if (time < OPEN_HOUR) return { open: false, label: 'Opens tonight at 7 pm' }
  if (time < CLOSE_HOUR) return { open: true, label: 'Open now · until 11 pm' }
  return { open: false, label: 'Closed for today — see you tomorrow' }
}

export const STATIC_STATUS = 'Open 7–11 pm · Closed Thursdays'
