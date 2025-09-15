"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { Clock, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import WhyAdvisoryAi from "@/components/WhyAdvisoryAi";
import IndustrySolutions from "@/components/IndustrySolutions";
import NewsletterSignup from "@/components/NewsletterSignup";
import FooterNewsletter from "@/components/FooterNewsletter";

export default function DemoPage() {
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
              <Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link>
              <a href="#why" className="text-sm hover:text-primary transition-colors">Why us</a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
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
                  AI & Automation for Tulsa Businesses.{" "}
                  <span className="text-gradient">Save time. Grow profit.</span>
                </h1>
                <p className="lead">
                  We help Tulsa companies cut admin hours, streamline operations, and unlock growth with practical AI workflows tailored to your business.
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

        {/* Why AdvisoryAi */}
        <WhyAdvisoryAi />

        {/* Industry Solutions */}
        <IndustrySolutions />

        {/* Newsletter Signup */}
        <section className="section">
          <div className="container-balanced">
            <div className="max-w-2xl mx-auto">
              <NewsletterSignup 
                title="Ready to Transform Your Business?"
                description="Join our newsletter for exclusive AI insights, automation strategies, and early access to new tools designed specifically for Tulsa businesses."
                source="demo_newsletter"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container-balanced py-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-heading font-semibold text-xl">AdvisoryAi</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                AI & Automation for Tulsa Businesses. We help local companies cut admin hours, streamline operations, and unlock growth with practical AI workflows.
              </p>
            </div>
            <FooterNewsletter />
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} AdvisoryAi. All rights reserved.
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
        </div>
      </footer>
    </div>
  );
}
