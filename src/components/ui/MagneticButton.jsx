import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { Button } from './Button'

/**
 * Wraps Button and drifts it a few pixels toward the cursor.
 * Desktop hover only (pointer: fine); touch and reduced motion get the plain button.
 */
export function MagneticButton({ strength = 7, className = '', children, ...rest }) {
  const wrap = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 22, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 22, mass: 0.4 })

  const canHover = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    if (!canHover() || !wrap.current) return
    const rect = wrap.current.getBoundingClientRect()
    x.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * strength * 2)
    y.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * strength * 2)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={wrap}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className}`}
    >
      <Button {...rest}>{children}</Button>
    </motion.span>
  )
}

export default MagneticButton
