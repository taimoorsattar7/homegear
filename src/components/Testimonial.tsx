import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import homeContent from '@/content/home.json'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-dark.svg'
import { cleanImagePath } from '@/lib/mdx'

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
            <figcaption className="mt-10 flex flex-wrap items-center gap-4">
              <div
                title={client.name}
                aria-label={client.name}
                className="flex h-14 items-center justify-center rounded-2xl bg-white px-5 py-2 shadow-xs border border-neutral-200/80 transition hover:shadow-md hover:border-neutral-300"
              >
                {typeof client.logo === 'string' ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    className="h-9 max-w-44 w-auto object-contain"
                  />
                ) : (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    className="h-9 max-w-44 w-auto object-contain"
                    unoptimized
                  />
                )}
              </div>
              {client.name && (
                <span className="font-display text-sm font-semibold tracking-wide text-neutral-900">
                  {client.name}
                </span>
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
  let logoSrc = t.clientLogo ? cleanImagePath(t.clientLogo) : logoMailSmirk

  return (
    <Testimonial
      className={className}
      client={{ name: clientName, logo: logoSrc }}
    >
      {quote}
    </Testimonial>
  )
}
