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

import { loadArticles } from '@/lib/mdx'
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
        eyebrow="Our culture"
        title="Balance your passion for work with a passion for life."
        invert
      >
        <p>
          We are a team of like-minded individuals who share strong core values. We believe in fostering a culture of loyalty, trust, and compassion, where we support each other’s growth and success. By empowering our team with flexibility and accountability, we create an environment where everyone can thrive and contribute their best work.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Loyalty" invert>
            We build lasting relationships and support each other’s growth.
          </GridListItem>
          <GridListItem title="Trust" invert>
            We empower our team with flexibility and accountability.

          </GridListItem>
          <GridListItem title="Compassion" invert>
            We respect one another and foster a supportive, understanding environment.
          </GridListItem>
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


function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <RootLayout>
      <PageIntro eyebrow="About us" title="We understand your needs and deliver together.">
        <p>
          We are a dedicated team that truly cares about your website and mobile performance. We focus on attention to detail and delivering results that meet—and exceed—your expectations. From design and development to thorough testing, we ensure every product is fully refined before it reaches our clients.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            We believe our greatest strength lies in our collaborative approach, placing our clients at the center of everything we do. By working closely with you, we turn your ideas into high-quality digital solutions that are both effective and reliable.
          </p>
          <p>
            We started with a simple goal: to offer high-quality digital services at fair and transparent pricing. Since the beginning, we’ve been committed to doing things differently—providing real value while maintaining strong relationships with our clients.
          </p>
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
