import { NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(request: Request) {
  try {
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured.')
      return NextResponse.json(
        { error: 'Email service configuration error. Please try again later.' },
        { status: 500 },
      )
    }

    const body = await request.json()
    const { name, email, company, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 },
      )
    }

    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Homegear Contact <onboarding@resend.dev>'
    const toAddress = process.env.RESEND_TO_EMAIL || 'taimoorsattar7@gmail.com'

    const sendEmailPayload = (from: string, to: string) => ({
      from,
      to: [to],
      reply_to: email,
      subject: `New Inquiry from ${name} via Homegear Website`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #000; margin-bottom: 20px;">New Contact Inquiry - Homegear</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #333;">Message:</h3>
          <p style="white-space: pre-wrap; color: #555; background: #f9f9f9; padding: 15px; border-radius: 6px;">${message}</p>
        </div>
      `,
    })

    let res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(sendEmailPayload(fromAddress, toAddress)),
    })

    let data = await res.json()

    // If initial attempt failed due to unverified domain or restricted recipient in Resend test mode, retry with safe onboarding defaults
    if (!res.ok && (
      data.message?.includes('testing emails') ||
      data.message?.includes('verify a domain') ||
      data.name === 'validation_error'
    )) {
      console.warn('Resend domain not verified yet. Automatically falling back to test sandbox (onboarding@resend.dev -> taimoorsattar7@gmail.com)...')
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(sendEmailPayload('Homegear Contact <onboarding@resend.dev>', 'taimoorsattar7@gmail.com')),
      })
      data = await res.json()
    }

    if (!res.ok) {
      console.error('Resend API Error:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to send email message.' },
        { status: res.status },
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending your message.' },
      { status: 500 },
    )
  }
}
