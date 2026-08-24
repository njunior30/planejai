import type { CSSProperties } from 'react'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  spacing?: number
  className?: string
}

export function Divider({
  orientation = 'horizontal',
  spacing = 16,
  className,
}: DividerProps) {
  const style: CSSProperties =
    orientation === 'horizontal'
      ? { marginTop: spacing, marginBottom: spacing }
      : { marginLeft: spacing, marginRight: spacing }

  const classNamesByOrientation = {
    horizontal: 'h-px w-full',
    vertical: 'h-full w-px self-stretch',
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      style={style}
      className={['bg-border', classNamesByOrientation[orientation], className]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
