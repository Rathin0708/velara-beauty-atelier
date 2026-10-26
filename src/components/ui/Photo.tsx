import { useState, type CSSProperties } from 'react'
import { hasImage, imageSrcSet, imageUrl } from '../../data/images'
import type { ImageKey } from '../../data/types'
import { cx } from '../../lib/utils'
import { Monogram } from './Monogram'

interface Props {
  name: ImageKey
  alt: string
  sizes?: string
  eager?: boolean
  className?: string
  position?: string
  mobilePosition?: string
  style?: CSSProperties
  /** Gives the wrapper's inner <img> a class so motion wrappers can target it. */
  imgClassName?: string
}

/** Responsive image with srcset, lazy loading, explicit aspect via parent class, and an on-brand error state. */
export function Photo({ name, alt, sizes = '100vw', eager, className, position, mobilePosition, style, imgClassName }: Props) {
  const [failed, setFailed] = useState(!hasImage(name))
  const vars = { ...style, ['--pos' as string]: position ?? '50% 50%', ['--pos-m' as string]: mobilePosition ?? position ?? '50% 50%' }
  return (
    <div className={cx('media', className)} style={vars}>
      {failed ? (
        <div className="media-fallback" role={alt ? 'img' : undefined} aria-label={alt || undefined}>
          <Monogram size={40} />
        </div>
      ) : (
        <img
          className={cx('img-fit', imgClassName)}
          src={imageUrl(name, 1200)}
          srcSet={imageSrcSet(name)}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          {...(eager ? { fetchPriority: 'high' as const } : {})}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
