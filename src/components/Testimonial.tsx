import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import homeContent from '@/content/home.json'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-dark.svg'

export function Testimonial({
  children,
  client,
  className,
}: {
  children: React.ReactNode
  client: { logo: ImageProps['src']; name: string }
  className?: string
}) {
  return (
    <div
      className={clsx(
        'relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32',
        className,
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full mask-[linear-gradient(to_bottom_left,white_50%,transparent_60%)] fill-neutral-100 stroke-neutral-950/5"
        yOffset={-256}
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="relative font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              <p className="before:content-['“'] after:content-['”'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10">
              {typeof client.logo === 'string' ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <Image src={client.logo} alt={client.name} unoptimized />
              )}
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  )
}

export function SharedTestimonial({ className }: { className?: string }) {
  const t = (homeContent as any).testimonial || {}
  const quote = t.quote || "The Homegear team worked seamlessly alongside our internal developers. They brought deep technical clarity, structured code quality, and shipped our core web platform ahead of schedule."
  const clientName = t.clientName || "Mail Smirk"
  let logoSrc = t.clientLogo || logoMailSmirk
  if (typeof logoSrc === 'string' && logoSrc && !logoSrc.startsWith('/') && !logoSrc.startsWith('http') && !logoSrc.startsWith('./') && !logoSrc.startsWith('@/')) {
    logoSrc = `/images/uploads/${logoSrc}`
  }

  return (
    <Testimonial
      className={className}
      client={{ name: clientName, logo: logoSrc }}
    >
      {quote}
    </Testimonial>
  )
}
