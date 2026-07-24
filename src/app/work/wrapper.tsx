import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { RootLayout } from '@/components/RootLayout'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

function resolveSnapshotSrc(snap: any): string {
  let raw = typeof snap === 'string' ? snap : snap?.image || snap?.src || snap
  if (typeof raw !== 'string') return raw?.src || ''
  if (raw.startsWith('/') || raw.startsWith('http') || raw.startsWith('./') || raw.startsWith('@/')) {
    return raw
  }
  return `/images/uploads/${raw}`
}

export default async function CaseStudyLayout({
  caseStudy,
  children,
}: {
  caseStudy: MDXEntry<CaseStudy>
  children: React.ReactNode
}) {
  let allCaseStudies = await loadCaseStudies()
  let moreCaseStudies = allCaseStudies
    .filter(({ metadata }) => metadata !== caseStudy)
    .slice(0, 2)

  let bannerImage = caseStudy.image
  if (!bannerImage && caseStudy.snapshots && caseStudy.snapshots.length > 0) {
    bannerImage = { src: resolveSnapshotSrc(caseStudy.snapshots[0]) }
  }

  return (
    <RootLayout>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow="Case Study" title={caseStudy.title} centered>
            <p>{caseStudy.description}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-2">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0">
                      <dt className="font-semibold">Client</dt>
                      <dd>{caseStudy.client}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                      <dt className="font-semibold">Service</dt>
                      <dd>{caseStudy.service}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            {bannerImage && (
              <div className="border-y border-neutral-200 bg-neutral-100">
                <div className="mx-auto -my-px max-w-304 bg-neutral-200">
                  <GrayscaleTransitionImage
                    {...(typeof bannerImage === 'string' ? { src: bannerImage } : bannerImage)}
                    quality={90}
                    className="w-full"
                    sizes="(min-width: 1216px) 76rem, 100vw"
                    priority
                  />
                </div>
              </div>
            )}
          </FadeIn>
        </header>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
          </FadeIn>
        </Container>

        {caseStudy.testimonial && caseStudy.testimonial.content && (
          <Container className="mt-24 sm:mt-32">
            <FadeIn>
              <Blockquote author={caseStudy.testimonial.author}>
                {caseStudy.testimonial.content}
              </Blockquote>
            </FadeIn>
          </Container>
        )}

        {caseStudy.snapshots && caseStudy.snapshots.length > 0 && (
          <Container className="mt-24 sm:mt-32">
            <FadeIn>
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                Project Snapshots & Showcase
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {caseStudy.snapshots.map((snap: any, index: number) => {
                  const src = resolveSnapshotSrc(snap)
                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm transition hover:shadow-md aspect-4/3"
                    >
                      <img
                        src={src}
                        alt={`${caseStudy.client} snapshot ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )
                })}
              </div>
            </FadeIn>
          </Container>
        )}
      </article>

      {moreCaseStudies.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More case studies"
          pages={moreCaseStudies}
        />
      )}

      <ContactSection />
    </RootLayout>
  )
}
