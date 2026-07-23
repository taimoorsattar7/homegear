'use client'

import { useId, useState } from 'react'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import companyContent from '@/content/company.json'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full rounded-xl border border-neutral-200 bg-white/70 px-5 pt-8 pb-3 text-base text-neutral-950 shadow-xs transition-all placeholder-transparent focus:border-neutral-950 focus:bg-white focus:ring-2 focus:ring-neutral-950/10 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-3 left-5 origin-left text-xs font-semibold uppercase tracking-wider text-neutral-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-3 peer-focus:text-xs peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', company: '', phone: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to send email. Please try again.')
      }
    } catch (err: any) {
      setStatus('error')
      setErrorMessage('A network error occurred. Please try again later.')
    }
  }

  return (
    <FadeIn className="lg:order-last">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-neutral-200 bg-neutral-50/50 p-6 sm:p-10 shadow-sm"
      >
        <h2 className="font-display text-xl font-semibold text-neutral-950">
          Work inquiries
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Tell us about your project or inquiry. Your message will be delivered directly to <span className="font-semibold text-neutral-900">info@homegear.dev</span>.
        </p>

        {status === 'success' && (
          <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-sm text-emerald-900">
            <p className="font-semibold text-base">Thank you for reaching out!</p>
            <p className="mt-1">Your message has been sent to info@homegear.dev. Our team will get back to you shortly.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-5 text-sm text-rose-900">
            <p className="font-semibold">Unable to send message</p>
            <p className="mt-1">{errorMessage}</p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <TextInput
            label="Name *"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />
          <TextInput
            label="Email *"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <TextInput
            label="Company (Optional)"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
          />
          <TextInput
            label="Phone (Optional)"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          <div className="group relative z-0">
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="block w-full rounded-xl border border-neutral-200 bg-white/70 p-5 text-base text-neutral-950 shadow-xs transition-all placeholder:text-neutral-500 focus:border-neutral-950 focus:bg-white focus:ring-2 focus:ring-neutral-950/10 focus:outline-hidden"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-8 w-full justify-center py-4 text-base font-medium shadow-md disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending Message...' : 'Send Message →'}
        </Button>
      </form>
    </FadeIn>
  )
}

function ContactDetails() {
  return (
    <FadeIn className="flex flex-col justify-between">
      <div>
        <h2 className="font-display text-xl font-semibold text-neutral-950">
          Our office & address
        </h2>
        <p className="mt-4 text-base text-neutral-600 leading-relaxed">
          {companyContent.name} is headquartered in {companyContent.city}. Feel free to reach out via email or phone, or visit our team in person.
        </p>

        <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

        <Border className="mt-16 pt-12">
          <h2 className="font-display text-lg font-semibold text-neutral-950">
            Direct Contact Information
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5 transition hover:border-neutral-400">
              <dt className="font-semibold text-neutral-950 flex items-center gap-x-2">
                <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </dt>
              <dd className="mt-2">
                <Link
                  href={`mailto:${companyContent.email}`}
                  className="text-neutral-600 hover:text-neutral-950 font-medium underline underline-offset-4 decoration-neutral-300"
                >
                  {companyContent.email}
                </Link>
              </dd>
            </div>
            <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5 transition hover:border-neutral-400">
              <dt className="font-semibold text-neutral-950 flex items-center gap-x-2">
                <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone
              </dt>
              <dd className="mt-2">
                <Link
                  href={`tel:${companyContent.phone}`}
                  className="text-neutral-600 hover:text-neutral-950 font-medium underline underline-offset-4 decoration-neutral-300"
                >
                  {companyContent.phone}
                </Link>
              </dd>
            </div>
          </dl>
        </Border>
      </div>
    </FadeIn>
  )
}

export default function Contact() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Contact us" title="Let’s work together">
        <p>We can’t wait to hear from you.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </RootLayout>
  )
}
