import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'

import logoCles from '@/images/clients/cles_c_left.png'
import logoCMB from '@/images/clients/logo_bianco_cmb_150x60.webp'
import logoAwnas from '@/images/clients/awnaslogo.png'

import imageLaptop from '@/images/laptop.jpg'
import { type Article, type CaseStudy, type MDXEntry, loadArticles, loadCaseStudies } from '@/lib/mdx'
import { formatDate } from '@/lib/formatDate'
import { RootLayout } from '@/components/RootLayout'
import homeContent from '@/content/home.json'

const clients: Array<[string, typeof logoCles]> = [
  ['Cles', logoCles],
  ['CMB', logoCMB],
  ['Awnas', logoAwnas],
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            {homeContent.clientsHeading}
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 place-items-center"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image className="max-h-24 w-auto block" src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function ProjectsSection({
  projects,
}: {
  projects: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Projects We Have Worked On"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Discover some of the digital experiences, web solutions, and mobile applications we’ve built for our clients.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <FadeIn key={project.href} className="flex">
              <article className="group relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-50 hover:shadow-xl hover:ring-neutral-950/20 sm:p-8">
                <h3>
                  <Link href={project.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={project.logo}
                      alt={project.client}
                      className="h-16 w-16 transition-transform duration-300 group-hover:scale-110"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex items-center gap-x-2 text-sm">
                  <span className="font-semibold text-neutral-950">{project.client}</span>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span className="font-medium text-neutral-600">Project</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950 group-hover:text-neutral-950">
                  {project.title}
                </p>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                  {project.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  const serviceIcons = [
    <svg key="web" className="w-8 h-8 text-neutral-950 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>,
    <svg key="mobile" className="w-8 h-8 text-neutral-950 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>,
    <svg key="design" className="w-8 h-8 text-neutral-950 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>,
    <svg key="cloud" className="w-8 h-8 text-neutral-950 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>,
  ]

  return (
    <>
      <SectionIntro
        eyebrow={homeContent.servicesEyebrow}
        title={homeContent.servicesTitle}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{homeContent.servicesDescription}</p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <FadeIn className="w-full max-w-md lg:max-w-none">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 30rem, 100vw"
                className="justify-center"
              />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeInStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {homeContent.servicesList.map((service, index) => (
                <FadeIn key={service.title} className="flex">
                  <div className="group relative flex w-full flex-col rounded-3xl border border-neutral-200/80 bg-neutral-50/50 p-6 transition-all duration-300 hover:border-neutral-950 hover:bg-white hover:shadow-lg">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xs group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300">
                      {serviceIcons[index % serviceIcons.length]}
                    </div>
                    <h3 className="mt-6 font-display text-lg font-semibold text-neutral-950">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </Container>
    </>
  )
}

function BlogSection({ articles }: { articles: Array<MDXEntry<Article>> }) {
  return (
    <>
      <SectionIntro
        eyebrow="Latest Articles"
        title="Insights and stories from our engineering team"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Stay up-to-date with our latest thoughts on web engineering, mobile development, and modern UX design.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {articles.map((article) => (
            <FadeIn key={article.href} className="flex">
              <article className="group relative flex w-full flex-col justify-between rounded-3xl border border-neutral-200/80 bg-neutral-50/50 p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-xl hover:border-neutral-300">
                <div>
                  <div className="flex items-center gap-x-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-neutral-950 group-hover:text-neutral-900">
                    <Link href={article.href}>
                      <span className="absolute inset-0 rounded-3xl" />
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-x-3 border-t border-neutral-200/80 pt-4">
                  <Image
                    alt={article.author.name}
                    {...article.author.image}
                    className="h-9 w-9 rounded-full object-cover grayscale flex-none"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-neutral-950">{article.author.name}</div>
                    <div className="text-neutral-500">{article.author.role}</div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'We are a development studio working at the intersection of design and technology.',
}

export default async function Home() {
  let projects = (await loadCaseStudies()).slice(0, 3)
  let articles = (await loadArticles()).slice(0, 3)

  return (
    <RootLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            {homeContent.heroTitle}
          </h1>
          <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
            {homeContent.heroDescription}
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <ProjectsSection projects={projects} />

      <Services />

      <BlogSection articles={articles} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoCles }}
      >
        Delivered on time and met client expectations with a solution aligned to requirements. Reliable and professional.
      </Testimonial>

      <ContactSection showOffices={false} />
    </RootLayout>
  )
}
