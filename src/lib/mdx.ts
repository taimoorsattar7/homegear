import { type ImageProps } from 'next/image'
import glob from 'fast-glob'
import teamMembers from '@/content/team.json'

import imageTaimoor from '@/images/team/taimoor.jpg'
import imageNoor from '@/images/noor.png'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'

const teamAvatars: Record<string, any> = {
  'Taimoor Sattar': imageTaimoor,
  Noor: imageNoor,
  'Angela Fisher': imageAngelaFisher,
  'Leslie Alexander': imageLeslieAlexander,
  'Dries Vincent': imageDriesVincent,
  'Kathryn Murphy': imageKathrynMurphy,
  'Chelsea Hagon': imageChelseaHagon,
  'Emma Dorsey': imageEmmaDorsey,
}

export function resolveAuthor(author: any) {
  const membersList = (teamMembers as any).team || teamMembers || []

  if (typeof author === 'string') {
    const found = membersList.find(
      (m: any) => m.name && m.name.toLowerCase() === author.toLowerCase(),
    )
    if (found) {
      let authorImg: any = null
      if (found.image && found.image !== 'na' && typeof found.image === 'string') {
        if (found.image.startsWith('@/')) {
          authorImg = teamAvatars[found.name] || imageTaimoor
        } else {
          authorImg = found.image.startsWith('/') || found.image.startsWith('http') || found.image.startsWith('./')
            ? found.image
            : `/images/uploads/${found.image}`
        }
      } else if (found.image && typeof found.image === 'object') {
        authorImg = found.image
      } else {
        authorImg = teamAvatars[found.name] || imageTaimoor
      }

      return {
        name: found.name,
        role: found.role,
        bio: found.bio || '',
        website: found.website || '',
        social: found.social || '',
        image: typeof authorImg === 'string' ? { src: authorImg } : authorImg,
      }
    }
    return {
      name: author,
      role: 'Team Member',
      bio: '',
      website: '',
      social: '',
      image: { src: teamAvatars[author] || imageTaimoor },
    }
  }

  if (author && typeof author === 'object') {
    const avatar = teamAvatars[author.name] || author.image || { src: imageTaimoor }
    return {
      name: author.name || 'Taimoor Sattar',
      role: author.role || 'Team Member',
      bio: author.bio || '',
      website: author.website || '',
      social: author.social || '',
      image: typeof avatar === 'object' && avatar.src ? avatar : { src: avatar },
    }
  }

  return {
    name: 'Taimoor Sattar',
    role: 'Senior Project Manager / CEO',
    bio: 'Leads engineering and product direction at Homegear, ensuring seamless software delivery and strategic execution.',
    website: '',
    social: '',
    image: { src: imageTaimoor },
  }
}

export function getTeamMembers() {
  const membersList = (teamMembers as any).team || teamMembers || []
  return membersList.map((m: any) => resolveAuthor(m.name || m))
}

import logoPhobia from '@/images/clients/phobia/logomark-dark.svg'
import logoUnseal from '@/images/clients/unseal/logomark-dark.svg'
import logoFamilyFund from '@/images/clients/family-fund/logomark-dark.svg'

const clientLogos: Record<string, any> = {
  Phobia: logoPhobia,
  Unseal: logoUnseal,
  FamilyFund: logoFamilyFund,
  'Family Fund': logoFamilyFund,
}

async function loadEntries<T extends { date: string }>(
  directory: string,
  metaName: string,
): Promise<Array<MDXEntry<T>>> {
  return (
    await Promise.all(
      (await glob('**/page.mdx', { cwd: `src/app/${directory}` })).map(
        async (filename) => {
          const mod = await import(`../app/${directory}/${filename}`)
          let metadata = {
            ...(mod.caseStudy || {}),
            ...(mod.article || {}),
            ...(mod[metaName] || {}),
            ...(mod.frontmatter || {}),
          } as any

          if (directory === 'blog') {
            metadata = {
              ...metadata,
              author: resolveAuthor(metadata.author),
            }
          }

          if (directory === 'work') {
            const clientName = metadata.client || ''
            let imageVal = metadata.image || (metadata.snapshots && metadata.snapshots[0])
            if (typeof imageVal === 'string') {
              if (!imageVal.startsWith('/') && !imageVal.startsWith('http') && !imageVal.startsWith('./') && !imageVal.startsWith('@/')) {
                imageVal = `/images/uploads/${imageVal}`
              }
            } else if (imageVal && typeof imageVal === 'object' && imageVal.src) {
              imageVal = imageVal.src
            }
            let logoVal = metadata.logo || clientLogos[clientName] || logoPhobia
            if (typeof logoVal === 'string' && !logoVal.startsWith('/') && !logoVal.startsWith('http') && !logoVal.startsWith('./') && !logoVal.startsWith('@/')) {
              logoVal = `/images/uploads/${logoVal}`
            }
            metadata = {
              ...metadata,
              logo: logoVal,
              image: imageVal,
              whatWeDid: metadata.whatWeDid || metadata.what_we_did || metadata.tags || [],
            }
          }

          return {
            ...metadata,
            metadata,
            href: `/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
          }
        },
      ),
    )
  ).sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export type MDXEntry<T> = T & { href: string; metadata: T }

export interface Article {
  date: string
  title: string
  description: string
  author: {
    name: string
    role: string
    bio?: string
    image: ImagePropsWithOptionalAlt
  }
}

export interface CaseStudy {
  date: string
  client: string
  title: string
  description: string
  summary: Array<string>
  logo: ImageProps['src']
  image: ImagePropsWithOptionalAlt
  snapshots?: Array<any>
  whatWeDid?: Array<string>
  service: string
  testimonial: {
    author: {
      name: string
      role: string
    }
    content: string
  }
}

export function loadArticles() {
  return loadEntries<Article>('blog', 'article')
}

export function loadCaseStudies() {
  return loadEntries<CaseStudy>('work', 'caseStudy')
}
