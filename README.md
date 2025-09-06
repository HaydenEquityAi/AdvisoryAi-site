# AdvisoryAi Landing Page

A modern, minimal landing page for AdvisoryAi built with Next.js, Tailwind CSS, and Resend for email handling.

## Features

- **Modern Design**: Clean black and white aesthetic with lots of white space
- **Responsive Layout**: Mobile-first design that works on all devices
- **Contact Form**: Secure form submission with client-side validation
- **Email Integration**: Resend API for reliable email delivery
- **Calendly Integration**: Inline scheduling widget
- **Rate Limiting**: Built-in protection against spam
- **Input Sanitization**: XSS protection and data validation

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   ```
   
   Then edit `.env.local` with your Resend API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   RESEND_FROM=AdvisoryAi <no-reply@yourdomain.com>
   ```

3. **Get your Resend API key:**
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys section
   - Create a new API key
   - Add it to your `.env.local` file

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** to see the site.

## Deployment to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Add environment variables in Vercel:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `RESEND_API_KEY` = your Resend API key
     - `RESEND_FROM` = your verified sender email

4. **Deploy:**
   - Click "Deploy" and you're done!

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts    # Resend email API endpoint
│   ├── globals.css             # Global styles with Tailwind
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Home page with all sections
├── components/
│   └── ContactForm.tsx         # Reusable contact form component
```

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Zod schemas for all form data
- **XSS Protection**: HTML sanitization on all inputs
- **CORS Configuration**: Proper headers for API endpoints

## Customization

- **Calendly URL**: Update the iframe src in `src/app/page.tsx`
- **Email Recipient**: Change the `to` field in `src/app/api/contact/route.ts`
- **Styling**: Modify Tailwind classes throughout the components
- **Content**: Update text content in `src/app/page.tsx`

## Optional: N8N Integration

The contact form includes commented code for N8N webhook integration. To enable:

1. Uncomment the `sendToN8n` function in `src/app/api/contact/route.ts`
2. Add `N8N_WEBHOOK_URL` to your environment variables
3. Uncomment the function call in the POST handler

## Tech Stack

- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **Resend** - Email delivery
- **Zod** - Input validation
- **TypeScript** - Type safety