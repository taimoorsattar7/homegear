import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-dark.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-dark.svg'
import logoGreenLife from '@/images/clients/green-life/logo-dark.svg'
import logoHomeWork from '@/images/clients/home-work/logo-dark.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-dark.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-dark.svg'
import logoPhobia from '@/images/clients/phobia/logo-dark.svg'
import logoUnseal from '@/images/clients/unseal/logo-dark.svg'
import { formatDate } from '@/lib/formatDate'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'

function ProjectsList({
  projects,
}: {
  projects: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
          <h2 className="font-display text-2xl font-semibold text-neutral-950 sm:text-3xl">
            Selected Case Studies & Featured Work
          </h2>
          <span className="text-sm font-medium text-neutral-500">
            {projects.length} Case Studies
          </span>
        </div>
      </FadeIn>
      <div className="mt-12 space-y-16 sm:space-y-20">
        {projects.map((project) => (
          <FadeIn key={project.client}>
            <article className="group relative rounded-3xl border border-neutral-200/80 bg-neutral-50/50 p-6 sm:p-10 transition-all duration-300 hover:border-neutral-400 hover:bg-white hover:shadow-xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-x-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-xs border border-neutral-200/60 overflow-hidden">
                        {typeof project.logo === 'string' ? (
                          <img
                            src={project.logo}
                            alt={project.client}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Image
                            src={project.logo}
                            alt={project.client}
                            className="h-full w-full object-contain"
                            unoptimized
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-neutral-950">
                          {project.client}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-neutral-950/5 px-2.5 py-0.5 text-xs font-medium text-neutral-700 mt-1">
                          {project.service}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-x-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      <span>Completed</span>
                      <span>•</span>
                      <time dateTime={project.date}>
                        {formatDate(project.date)}
                      </time>
                    </div>
                  </div>

                  <div className="mt-8 hidden lg:block">
                    <Button href={project.href} className="w-full justify-center py-3 text-sm font-medium shadow-xs">
                      View Full Case Study →
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-8 lg:border-l lg:border-neutral-200/80 lg:pl-10">
                  <h3 className="font-display text-2xl font-semibold text-neutral-950 sm:text-3xl group-hover:text-neutral-900">
                    <Link href={project.href}>
                      <span className="absolute inset-0 rounded-3xl lg:hidden" />
                      {project.title}
                    </Link>
                  </h3>
                  
                  <div className="mt-4 space-y-4 text-base text-neutral-600 leading-relaxed">
                    {project.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {project.testimonial && (
                    <div className="mt-8 rounded-2xl bg-white p-6 border border-neutral-200/70 shadow-2xs">
                      <p className="text-sm italic text-neutral-700">
                        “{project.testimonial.content}”
                      </p>
                      <p className="mt-3 text-xs font-semibold text-neutral-950">
                        — {project.testimonial.author.name}, <span className="font-normal text-neutral-500">{project.testimonial.author.role}</span>
                      </p>
                    </div>
                  )}

                  <div className="mt-8 lg:hidden">
                    <Button href={project.href} className="w-full justify-center py-3 text-sm font-medium">
                      View Full Case Study →
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

const clients = [
  ['Phobia', logoPhobia],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Clients() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Trusted by Innovative Companies
        </h2>
        <p className="mt-2 text-base text-neutral-600 max-w-2xl">
          We’ve collaborated with startups and established enterprises across industries to engineer custom web software and digital tools.
        </p>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <ul
          role="list"
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map(([client, logo]) => (
            <li key={client} className="group">
              <FadeIn>
                <div className="flex h-24 items-center justify-center rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 transition-all duration-300 group-hover:border-neutral-400 group-hover:bg-white group-hover:shadow-md">
                  <Image src={logo} alt={client} className="max-h-12 w-auto object-contain" unoptimized />
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Explore our portfolio of custom web applications, mobile platforms, and software solutions built for our clients.',
}

import workContent from '@/content/work.json'

export default async function Work() {
  let projects = await loadCaseStudies()

  return (
    <RootLayout>
      <PageIntro
        eyebrow={workContent.eyebrow}
        title={workContent.title}
      >
        <p>{workContent.intro}</p>
      </PageIntro>

      <ProjectsList projects={projects} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Mail Smirk', logo: logoMailSmirk }}
      >
        The Homegear team worked seamlessly alongside our internal developers. They brought deep technical clarity, structured code quality, and shipped our core web platform ahead of schedule.
      </Testimonial>

      <Clients />

      <ContactSection />
    </RootLayout>
  )
}
