import ContactForm from "@/components/ContactForm";

export default function Home() {
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

        {/* Calendly Section */}
        <section className="px-6 sm:px-10 py-16 sm:py-24 border-b">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">Schedule a Call</h2>
            <div className="w-full">
              <div className="aspect-[16/9] w-full border rounded-md overflow-hidden bg-gray-50">
                <iframe
                  title="Schedule with AdvisoryAi"
                  className="w-full h-full"
                  src="https://calendly.com/hayden-capitalaiadvisors?hide_event_type_details=1&hide_gdpr_banner=1&embed_domain=localhost&embed_type=Inline"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 sm:px-10 py-16 sm:py-24 border-b">
          <div className="max-w-6xl mx-auto">
            <ContactForm />
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
