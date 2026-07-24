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
    const toAddress = process.env.RESEND_TO_EMAIL || 'info@homegear.dev'

    // 1. Inquiry email payload (sent to info@homegear.dev or RESEND_TO_EMAIL)
    const inquiryPayload = {
      from: fromAddress,
      to: [toAddress],
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
    }

    // 2. Thank You auto-response payload (sent to the user's contact field email)
    const thankYouPayload = {
      from: fromAddress,
      to: [email],
      subject: `Thank you for your inquiry - Homegear`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #000; margin-bottom: 16px;">Thank You for Contacting Homegear</h2>
          <p style="color: #333; font-size: 16px; line-height: 1.5;">Hi ${name},</p>
          <p style="color: #555; font-size: 15px; line-height: 1.5;">
            Thank you for reaching out to us! We have received your inquiry and our team will contact you shortly about your inquiry.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #888; font-size: 13px; margin: 0;">Best regards,<br /><strong>Homegear Team</strong><br /><a href="https://homegear.dev" style="color: #000; text-decoration: none;">info@homegear.dev</a></p>
        </div>
      `,
    }

    let res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(inquiryPayload),
    })

    let data = await res.json()

    // If initial attempt failed due to unverified domain or restricted recipient in Resend test mode, retry with fallback
    if (!res.ok && (
      data.message?.includes('testing emails') ||
      data.message?.includes('verify a domain') ||
      data.name === 'validation_error'
    )) {
      console.warn('Resend domain not verified yet. Falling back to default onboarding sender...')
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          ...inquiryPayload,
          from: 'Homegear Contact <onboarding@resend.dev>',
        }),
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

    // Send thank you email to the user email provided in contact form
    try {
      const thankYouRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(thankYouPayload),
      })
      if (!thankYouRes.ok) {
        const thankYouData = await thankYouRes.json()
        console.warn('Resend Thank You Email warning:', thankYouData)
      }
    } catch (thankYouErr) {
      console.warn('Error sending thank you email:', thankYouErr)
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
