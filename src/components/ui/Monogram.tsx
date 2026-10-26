export function Monogram({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path d="M7 28V15a9 9 0 0 1 18 0v13" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 28V16a4 4 0 0 1 8 0v12" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </svg>
  )
}
