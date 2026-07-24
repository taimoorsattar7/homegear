import Link from 'next/link'
import Image from 'next/image'
import TextIcon from '@/images/text-icon.png'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import homeContent from '@/content/home.json'
import companyContent from '@/content/company.json'

function getProjectLinks() {
  const cmsCompanies = (homeContent as any).clientsList || (homeContent as any).trustedCompanies
  if (Array.isArray(cmsCompanies) && cmsCompanies.length > 0) {
    const links = cmsCompanies
      .map((c: any) => {
        const name = typeof c === 'string' ? c : c.name || 'Project'
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        if (slug.includes('awnas')) return null
        let href = '/work'
        if (slug.includes('rightcam')) href = '/work/rightcam'
        else if (slug.includes('cles')) href = '/work/cleseconomia'
        else if (slug.includes('cmb') || slug.includes('family')) href = '/work/family-fund'
        return {
          title: name === 'Cles' ? 'Cles Economia' : name === 'CMB' ? 'Gruppo CMB' : name,
          href,
        }
      })
      .filter(Boolean) as Array<{ title: string; href: string }>

    links.push({ title: 'See all projects →', href: '/work' })
    return links
  }

  return [
    { title: 'RightCam', href: '/work/rightcam' },
    { title: 'Cles Economia', href: '/work/cleseconomia' },
    { title: 'Gruppo CMB', href: '/work/family-fund' },
    { title: 'See all projects →', href: '/work' },
  ]
}

function Navigation() {
  const projectLinks = getProjectLinks()

  const navigation = [
    {
      title: 'Projects',
      links: projectLinks,
    },
    {
      title: 'Company',
      links: [
        { title: 'Our Work', href: '/work' },
        { title: 'About Us', href: '/about' },
        { title: 'Our Process', href: '/process' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact Us', href: '/contact' },
      ],
    },
  ]

  return (
    <nav className="w-full">
      <div className="flex flex-col gap-10 sm:gap-12">
        {navigation.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950 min-w-28">
              {section.title}:
            </div>
            <ul role="list" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950 font-medium"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="w-full">
          <Navigation />
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Image className="w-32 sm:w-44 md:w-56 h-auto object-contain max-w-full" src={TextIcon} alt="Logo" />
          </Link>
          
          <p className="text-sm text-neutral-700">
           {companyContent.name}. {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
