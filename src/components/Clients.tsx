import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import homeContent from '@/content/home.json'
import { cleanImagePath } from '@/lib/mdx'

import logoPhobia from '@/images/clients/phobia/logo-dark.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-dark.svg'
import logoUnseal from '@/images/clients/unseal/logo-dark.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-dark.svg'

const defaultClients: Array<[string, any]> = [
  ['Phobia', logoPhobia],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
]

export function Clients({ heading }: { heading?: string }) {
  const cmsCompanies = (homeContent as any).trustedCompanies || (homeContent as any).clientsList

  let displayList: Array<{ name: string; logo: any }> = []

  if (Array.isArray(cmsCompanies) && cmsCompanies.length > 0) {
    displayList = cmsCompanies.map((c: any) => {
      const name = typeof c === 'string' ? c : c.name || ''
      let logo = typeof c === 'object' && c.logo ? c.logo : ''
      if (typeof logo === 'string' && logo) {
        logo = cleanImagePath(logo)
      }
      return { name, logo }
    })
  } else {
    displayList = defaultClients.map(([name, logo]) => ({ name, logo }))
  }

  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-16 sm:mt-32 sm:py-24 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            {heading || homeContent.clientsHeading || 'Trusted by forward-thinking companies worldwide'}
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 place-items-stretch"
          >
            {displayList.map((client) => (
              <li key={client.name} className="flex">
                <FadeIn className="w-full flex">
                  <div
                    title={client.name}
                    aria-label={client.name}
                    className="group relative flex w-full flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-white/95 p-5 shadow-xs transition-all duration-300 hover:scale-[1.04] hover:bg-white hover:border-neutral-300 hover:shadow-xl"
                  >
                    <div className="flex h-14 w-full items-center justify-center overflow-hidden">
                      {typeof client.logo === 'string' && client.logo ? (
                        <img
                          className="max-h-12 max-w-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          src={client.logo}
                          alt={client.name}
                          title={client.name}
                        />
                      ) : (
                        <Image
                          className="max-h-12 max-w-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          src={client.logo || logoPhobia}
                          alt={client.name}
                          title={client.name}
                          unoptimized
                        />
                      )}
                    </div>
                    <span className="mt-3 text-xs font-semibold tracking-wide text-neutral-700 transition-colors duration-200 group-hover:text-neutral-950 text-center">
                      {client.name}
                    </span>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
