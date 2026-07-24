'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'

const MotionImage = motion.create(Image)

export function GrayscaleTransitionImage(
  props: Pick<
    ImageProps,
    'src' | 'quality' | 'className' | 'sizes' | 'priority'
  > & { alt?: string },
) {
  let ref = useRef<HTMLDivElement>(null)
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!props.src) {
    return null
  }

  const isStringSrc = typeof props.src === 'string'
  const normalizedProps = isStringSrc
    ? { width: 1200, height: 800, unoptimized: true, ...props }
    : props

  if (!mounted) {
    return (
      <div ref={ref} className="group relative overflow-hidden">
        {isStringSrc ? (
          <img
            src={props.src as string}
            alt={props.alt || ''}
            className={`w-full h-auto object-cover ${props.className || ''}`}
          />
        ) : (
          <Image alt="" {...normalizedProps} />
        )}
      </div>
    )
  }

  return <GrayscaleTransitionImageAnimated containerRef={ref} props={normalizedProps} rawSrc={props.src} />
}

function GrayscaleTransitionImageAnimated({
  containerRef,
  props,
  rawSrc,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  props: any
  rawSrc: any
}) {
  let { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 35%'],
  })
  let grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1])
  let filter = useMotionTemplate`grayscale(${grayscale})`

  const isStringSrc = typeof rawSrc === 'string'

  return (
    <div ref={containerRef} className="group relative overflow-hidden">
      {isStringSrc ? (
        <motion.img
          src={rawSrc}
          alt=""
          style={{ filter } as any}
          className={`w-full h-auto object-cover ${props.className || ''}`}
        />
      ) : (
        <MotionImage alt="" style={{ filter } as any} {...props} />
      )}
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-full opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        {isStringSrc ? (
          <img
            src={rawSrc}
            alt=""
            className={`w-full h-auto object-cover ${props.className || ''}`}
          />
        ) : (
          <Image alt="" {...props} />
        )}
      </div>
    </div>
  )
}
