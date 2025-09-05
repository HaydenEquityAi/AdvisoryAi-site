"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          businessType: formData.get("businessType"),
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="px-6 sm:px-10 py-6 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-semibold tracking-tight">AdvisoryAi</span>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#about" className="hover:underline">About</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="px-6 sm:px-10 py-20 sm:py-28 border-b">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
              AdvisoryAi
            </h1>
            <p className="mt-4 text-lg sm:text-xl max-w-2xl text-neutral-700">
              AI solutions for small businesses to save time and cut costs.
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-6 sm:px-10 py-16 sm:py-24 border-b">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-10 items-start">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">About</h2>
            <p className="text-neutral-700 leading-relaxed">
              AdvisoryAi provides practical AI consulting, tailored integrations, and automation
              workflows that fit your existing tools. We help streamline processes, eliminate
              repetitive work, and surface insights so your team can focus on growth.
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-6 sm:px-10 py-16 sm:py-24 border-b">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Services</h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              {[
                { title: "AI Process Automation", desc: "Automate manual tasks and back-office operations with reliable AI agents." },
                { title: "Workflow Optimization", desc: "Design efficient processes across tools like Slack, Notion, HubSpot, and more." },
                { title: "Business Intelligence Dashboards", desc: "Custom dashboards connecting your data for real-time decisions." },
              ].map((s) => (
                <div key={s.title} className="border rounded-lg p-6 hover:shadow-sm transition-shadow bg-white">
                  <h3 className="font-medium text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 sm:px-10 py-16 sm:py-24 border-b">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Contact</h2>
            <form
              className="mt-8 grid sm:grid-cols-2 gap-6"
              action={async (formData) => {
                await handleSubmit(formData);
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm">Name</label>
                <input id="name" name="name" required className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm">Email</label>
                <input id="email" name="email" type="email" required className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm">Phone</label>
                <input id="phone" name="phone" className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="businessType" className="text-sm">Business Type</label>
                <input id="businessType" name="businessType" className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center border px-5 py-2.5 rounded-md bg-black text-white hover:bg-white hover:text-black transition-colors"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Submitting..." : "Submit"}
                </button>
                {status === "success" && (
                  <p className="mt-3 text-sm text-green-600">Thanks! We'll be in touch shortly.</p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
                )}
              </div>
            </form>

            {/* Calendly */}
            <div className="mt-12">
              <div className="aspect-[16/9] w-full border rounded-md overflow-hidden">
                <iframe
                  title="Schedule with AdvisoryAi"
                  className="w-full h-full"
                  src="https://calendly.com/your-calendly-username/intro-call?hide_event_type_details=1&hide_gdpr_banner=1"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 sm:px-10 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <span>© {new Date().getFullYear()} AdvisoryAi</span>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
