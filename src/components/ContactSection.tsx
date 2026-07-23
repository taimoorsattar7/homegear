import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'

export function ContactSection({
  showOffices = false,
}: {
  showOffices?: boolean
}) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="relative isolate overflow-hidden rounded-4xl bg-neutral-950 px-6 py-16 sm:px-12 sm:py-24 md:px-16 shadow-2xl">
        <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
              Tell us about your project
            </h2>
            <p className="mt-4 text-base text-neutral-300 sm:text-lg leading-relaxed">
              Have an idea, custom software request, or looking for an engineering partner? Let’s collaborate to build something exceptional.
            </p>
            <div className="mt-8 flex items-center gap-x-4">
              <Button href="/contact" invert className="px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-transform">
                Say Hello →
              </Button>
            </div>
            {showOffices && (
              <div className="mt-12 border-t border-white/10 pt-10">
                <h3 className="font-display text-base font-semibold text-white">
                  Our offices
                </h3>
                <Offices
                  invert
                  className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                />
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
