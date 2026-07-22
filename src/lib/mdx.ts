import { type ImageProps } from 'next/image'
import glob from 'fast-glob'
import teamMembers from '@/content/team.json'

import imageTaimoor from '@/images/team/taimoor.jpg'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'

const teamAvatars: Record<string, any> = {
  'Taimoor Sattar': imageTaimoor,
  'Angela Fisher': imageAngelaFisher,
  'Leslie Alexander': imageLeslieAlexander,
  'Dries Vincent': imageDriesVincent,
  'Kathryn Murphy': imageKathrynMurphy,
  'Chelsea Hagon': imageChelseaHagon,
  'Emma Dorsey': imageEmmaDorsey,
}

export function resolveAuthor(author: any) {
  if (typeof author === 'string') {
    const found = teamMembers.find(
      (m) => m.name.toLowerCase() === author.toLowerCase(),
    )
    if (found) {
      return {
        name: found.name,
        role: found.role,
        image: { src: teamAvatars[found.name] || imageTaimoor },
      }
    }
    return {
      name: author,
      role: 'Team Member',
      image: { src: imageTaimoor },
    }
  }

  if (author && typeof author === 'object') {
    const avatar = teamAvatars[author.name] || author.image || { src: imageTaimoor }
    return {
      name: author.name || 'Taimoor Sattar',
      role: author.role || 'Team Member',
      image: typeof avatar === 'object' && avatar.src ? avatar : { src: avatar },
    }
  }

  return {
    name: 'Taimoor Sattar',
    role: 'Senior Project Manager',
    image: { src: imageTaimoor },
  }
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
          let metadata = (mod.frontmatter || mod[metaName] || mod.article || mod.caseStudy || {}) as any

          if (directory === 'blog') {
            metadata = {
              ...metadata,
              author: resolveAuthor(metadata.author),
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
