"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { CheckCircle, Clock, TrendingUp, Zap, BarChart3, Workflow, Bot } from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? "dark" : ""}`}>
      <Toaster />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-balanced">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-heading font-semibold">AdvisoryAi</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm hover:text-primary transition-colors">Services</a>
              <a href="#why" className="text-sm hover:text-primary transition-colors">Why us</a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
              <a href="#schedule" className="text-sm hover:text-primary transition-colors">Schedule</a>
              <Button asChild className="btn-primary">
                <a href="#schedule">Book a call</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="section bg-mesh">
          <div className="container-balanced">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="h1">
                  Automate ops. Save hours.{" "}
                  <span className="text-gradient">Grow margin.</span>
                </h1>
                <p className="lead">
                  Practical AI workflows and dashboards that plug into your existing Google stack.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="btn-primary">
                    <a href="#schedule">Get a free strategy call</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="btn-ghost">
                    <a href="#services">See what we build</a>
                  </Button>
                </div>
              </div>
              
              {/* Case Study Card */}
              <div className="card p-8 space-y-6">
                <div className="text-center">
                  <h3 className="h3 mb-2">Client Impact</h3>
                  <p className="text-muted-foreground">Brain Body Soul Therapy and Wellness</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto">
                      <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="text-2xl font-bold">-15h</div>
                    <div className="text-xs text-muted-foreground">Admin hours/week</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
                      <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-2xl font-bold">+40%</div>
                    <div className="text-xs text-muted-foreground">Show rate</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto">
                      <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold">-3d</div>
                    <div className="text-xs text-muted-foreground">Time-to-deploy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section">
          <div className="container-balanced">
            <div className="text-center space-y-4 mb-16">
              <h2 className="h2">Services</h2>
              <p className="lead mx-auto">AI solutions that integrate seamlessly with your existing workflow</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Bot, 
                  title: "AI Process Automation", 
                  desc: "Automate manual tasks and back-office operations with reliable AI agents that work 24/7." 
                },
                { 
                  icon: Workflow, 
                  title: "Workflow Optimization", 
                  desc: "Design efficient processes across tools like Slack, Notion, HubSpot, and more." 
                },
                { 
                  icon: BarChart3, 
                  title: "Business Intelligence Dashboards", 
                  desc: "Custom dashboards connecting your data for real-time decisions and insights." 
                },
              ].map((service) => (
                <Card key={service.title} className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="h3">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section id="why" className="section bg-muted/30">
          <div className="container-balanced">
            <div className="text-center space-y-4 mb-16">
              <h2 className="h2">Why Choose AdvisoryAi</h2>
              <p className="lead mx-auto">Built for small businesses that need results, not complexity</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: CheckCircle, 
                  title: "Google-first stack", 
                  desc: "We build on tools you already use and trust" 
                },
                { 
                  icon: CheckCircle, 
                  title: "No long contracts", 
                  desc: "Month-to-month flexibility with clear deliverables" 
                },
                { 
                  icon: CheckCircle, 
                  title: "Fast, secure delivery", 
                  desc: "2-4 week implementation with enterprise-grade security" 
                },
              ].map((item) => (
                <div key={item.title} className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="h3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Booking */}
        <section id="contact" className="section min-h-[1000px] md:min-h-[1000px]">
          <div className="container-balanced">
            <div className="grid lg:grid-cols-2 gap-12 min-h-[800px] md:min-h-[1000px]">
              {/* Contact Form */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="h2">Get in touch</h2>
                  <p className="lead">
                    Tell us about your business and what you want to automate.
                  </p>
                </div>
                
                <ContactForm />
              </div>
              
              {/* Calendar */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="h2">Book a consultation</h2>
                  <p className="lead">
                    Schedule a free 30-minute strategy session
                  </p>
                </div>
                
                <CalendarWidget />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container-balanced py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="font-heading font-semibold">AdvisoryAi</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="h-8 w-8 p-0"
              >
                {isDark ? "☀️" : "🌙"}
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AdvisoryAi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error("Webhook URL not configured");
      }

      const payload = {
        ...formData,
        source: "AdvisoryAi site"
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", business: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="card">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bobby Raymond"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="bobby@brainbodysoul.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="business" className="text-sm font-medium">
              Business
            </label>
            <Input
              id="business"
              name="business"
              value={formData.business}
              onChange={handleChange}
              placeholder="Brain Body Soul Therapy and Wellness"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your business and what you want to automate..."
              rows={4}
              required
            />
          </div>
          
          <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 text-sm">
                Thanks! We&apos;ll reach out within 1 business day.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm">
                Something went wrong. Please try again.
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

// Calendar Widget Component
function CalendarWidget() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!calendlyUrl || calendlyUrl.includes('/app/')) {
    return (
      <Card className="card">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Calendar Unavailable</h3>
              <p className="text-muted-foreground text-sm">
                Please contact us directly to schedule a consultation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card">
      <CardContent className="p-0">
        <div className="h-[600px] w-full">
          <iframe
            title="Schedule with AdvisoryAi"
            className="w-full h-full rounded-2xl"
            src={`${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&embed_domain=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&embed_type=Inline`}
            frameBorder="0"
          />
        </div>
      </CardContent>
    </Card>
  );
}
