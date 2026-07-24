import Image from 'next/image'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { RootLayout } from '@/components/RootLayout'
import { formatDate } from '@/lib/formatDate'
import { type Article, type MDXEntry, loadArticles, resolveAuthor } from '@/lib/mdx'

export default async function BlogArticleWrapper({
  article,
  children,
}: {
  article: MDXEntry<Article>
  children: React.ReactNode
}) {
  let allArticles = await loadArticles()
  let moreArticles = allArticles
    .filter(({ metadata }) => metadata?.title !== article?.title)
    .slice(0, 2)

  let author = resolveAuthor(article?.author)

  return (
    <RootLayout>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {article?.date && (
              <time
                dateTime={article.date}
                className="text-sm font-semibold tracking-wider uppercase text-neutral-500"
              >
                {formatDate(article.date)}
              </time>
            )}
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-neutral-950 sm:text-6xl">
              {article?.title}
            </h1>
            
            {author && (
              <div className="mt-8 flex items-center justify-center gap-x-4 rounded-full border border-neutral-200 bg-neutral-50/80 px-5 py-2.5 shadow-xs">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-100 flex-none">
                  {typeof author.image?.src === 'string' ? (
                    <img
                      src={author.image.src}
                      alt={author.name}
                      className="h-full w-full object-cover grayscale"
                    />
                  ) : (
                    <Image
                      alt={author.name}
                      {...author.image}
                      className="h-full w-full object-cover grayscale"
                      unoptimized
                    />
                  )}
                </div>
                <div className="text-left text-sm">
                  <div className="font-semibold text-neutral-950">
                    {author.name}
                  </div>
                  <div className="text-xs text-neutral-500 font-medium">
                    {author.role}
                  </div>
                </div>
              </div>
            )}
          </header>
        </FadeIn>

        <FadeIn>
          <MDXComponents.wrapper className="mt-16 sm:mt-24">
            {children}
          </MDXComponents.wrapper>
        </FadeIn>

        {author && (
          <FadeIn className="mx-auto mt-20 max-w-3xl border-t border-neutral-200 pt-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded-3xl border border-neutral-200/80 bg-neutral-50/60 p-6 sm:p-8 shadow-xs">
              <div className="h-20 w-20 overflow-hidden rounded-2xl bg-neutral-100 flex-none shadow-xs">
                {typeof author.image?.src === 'string' ? (
                  <img
                    src={author.image.src}
                    alt={author.name}
                    className="h-full w-full object-cover grayscale"
                  />
                ) : (
                  <Image
                    alt={author.name}
                    {...author.image}
                    className="h-full w-full object-cover grayscale"
                    unoptimized
                  />
                )}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-display text-xl font-semibold text-neutral-950">
                  Written by {author.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mt-1">
                  {author.role}
                </p>
                {author.bio && (
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                    {author.bio}
                  </p>
                )}
                {(author.website || author.social) && (
                  <div className="mt-4 flex items-center justify-center sm:justify-start gap-x-4 text-xs font-medium">
                    {author.website && (
                      <a
                        href={author.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-950 underline hover:text-neutral-700"
                      >
                        🌐 Website
                      </a>
                    )}
                    {author.social && (
                      <a
                        href={author.social}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-950 underline hover:text-neutral-700"
                      >
                        🔗 Social Profile
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        )}
      </Container>

      {moreArticles.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More articles"
          pages={moreArticles}
        />
      )}

      <ContactSection />
    </RootLayout>
  )
}
