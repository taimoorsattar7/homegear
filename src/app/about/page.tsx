import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'

import imageTaimoor from '@/images/team/taimoor.jpg'

import { loadArticles, resolveAuthor, getTeamMembers } from '@/lib/mdx'

function Team() {
  const members = getTeamMembers()

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        <FadeInStagger>
          <Border as={FadeIn} />
          <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
            <FadeIn>
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                Our Team
              </h2>
            </FadeIn>
            <div className="lg:col-span-3">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
              >
                {members.map((person: any) => {
                  const imgSrc = typeof person.image?.src === 'string' ? person.image.src : person.image
                  return (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100 shadow-sm border border-neutral-200/80">
                          {typeof imgSrc === 'string' ? (
                            <img
                              className="h-96 w-full object-cover transition duration-300 group-hover:scale-105"
                              src={imgSrc}
                              alt={person.name}
                            />
                          ) : (
                            <Image
                              className="h-96 w-full object-cover transition duration-300 group-hover:scale-105"
                              src={imgSrc}
                              alt={person.name}
                              unoptimized
                            />
                          )}
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white transition duration-300">
                            <p className="font-display text-base font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-1 text-xs font-medium text-neutral-300">
                              {person.role}
                            </p>
                            {person.bio && (
                              <p className="mt-2 text-xs text-neutral-300/90 line-clamp-3 leading-relaxed">
                                {person.bio}
                              </p>
                            )}
                            {(person.website || person.social) && (
                              <div className="mt-3 flex items-center gap-x-3 text-xs">
                                {person.website && (
                                  <a
                                    href={person.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-semibold text-white hover:underline"
                                  >
                                    🌐 Website
                                  </a>
                                )}
                                {person.social && (
                                  <a
                                    href={person.social}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-semibold text-white hover:underline"
                                  >
                                    🔗 Social
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </FadeInStagger>
      </div>
    </Container>
  )
}
import { RootLayout } from '@/components/RootLayout'
// IMAGES
import logoDocker from '@/images/tech/docker_logo.png'
import logoNextjs from '@/images/tech/nextjs-3.svg'
import logoDrupal from '@/images/tech/drupal_logo.png'
import logoJavascript from '@/images/tech/javaScript_logo.png'
import logoNodejs from '@/images/tech/nodejs-logo-svg-vector.svg'
import logoPostgresql from '@/images/tech/postgresql_logo_icon.webp'
import logoReactjs from '@/images/tech/reactjs_logo_icon.webp'
import logoSQL from '@/images/tech/sql-database-icon.webp'
import logoWordpress from '@/images/tech/wordPress_logo.png'
import logoPhotoshop from '@/images/tech/photoshop_logo.png'

const tech = [
  ['Docker', logoDocker],
  ['Next.js', logoNextjs],
  ['Drupal', logoDrupal],
  ['JavaScript', logoJavascript],
  ['Node.js', logoNodejs],
  ['PostgreSQL', logoPostgresql],
  ['React', logoReactjs],
  ['SQL', logoSQL],
  ['WordPress', logoWordpress],
  ['Photoshop', logoPhotoshop]
  
]

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow={aboutContent.cultureEyebrow}
        title={aboutContent.cultureTitle}
        invert
      >
        <p>{aboutContent.cultureDescription}</p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          {aboutContent.cultureList.map((item) => (
            <GridListItem key={item.title} title={item.title} invert>
              {item.description}
            </GridListItem>
          ))}
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Taimoor Sattar',
        role: 'Senior Project Manager / CEO',
        image: { src: imageTaimoor },
      }
    ],
  },
  // {
  //   title: 'Team',
  //   people: [
  //     {
  //       name: 'Noor',
  //       role: 'Senior Designer',
  //       image: { src: imageChelseaHagon },
  //     },
  //     {
  //       name: 'Emma Dorsey',
  //       role: 'Senior Designer',
  //       image: { src: imageEmmaDorsey },
  //     }
  //   ],
  // },
]


function LogosMemo() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-lg/8 font-semibold text-gray-900 dark:text-white">
            Some of the technology we have worked with
          </h2>
          <div className="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">

            {tech.map(([tech, logo]) => (

              <FadeIn>
                <Image className="grayscale col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1 dark:hidden" src={logo} alt={tech} unoptimized />
              </FadeIn>

            ))}
            
            
          </div>
        </div>
      </div>
    </div>
  )
}


export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

import aboutContent from '@/content/about.json'

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <RootLayout>
      <PageIntro eyebrow={aboutContent.eyebrow} title={aboutContent.title}>
        <p>{aboutContent.introMain}</p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>{aboutContent.introSecondary}</p>
        </div>
      </PageIntro>

      <LogosMemo />
      
      {/* <Container className="mt-16">
        <StatList>
          <StatListItem value="35" label="Underpaid employees" />
          <StatListItem value="52" label="Placated clients" />
          <StatListItem value="$25M" label="Invoices billed" />
        </StatList>
      </Container> */}

      <Culture />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      />

      <ContactSection />
    </RootLayout>
  )
}
