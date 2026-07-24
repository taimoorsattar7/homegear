import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import homeContent from '@/content/home.json'

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
      if (typeof logo === 'string' && logo && !logo.startsWith('/') && !logo.startsWith('http') && !logo.startsWith('./') && !logo.startsWith('@/')) {
        logo = `/images/uploads/${logo}`
      }
      return { name, logo }
    })
  } else {
    displayList = defaultClients.map(([name, logo]) => ({ name, logo }))
  }

  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
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
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 place-items-center"
          >
            {displayList.map((client) => (
              <li key={client.name}>
                <FadeIn>
                  {typeof client.logo === 'string' && client.logo ? (
                    <img className="max-h-24 max-w-36 w-auto block object-contain filter invert opacity-90 transition hover:opacity-100" src={client.logo} alt={client.name} />
                  ) : (
                    <Image className="max-h-24 w-auto block filter invert opacity-90 transition hover:opacity-100" src={client.logo || logoPhobia} alt={client.name} unoptimized />
                  )}
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
