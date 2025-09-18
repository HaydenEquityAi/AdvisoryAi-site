"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface FooterNewsletterProps {
  className?: string;
}

export default function FooterNewsletter({ className = "" }: FooterNewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source: "footer"
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-300">
          Get AI insights and automation tips delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-primary focus:ring-primary/20"
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary whitespace-nowrap"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>

        {submitStatus === "success" && (
          <div className="flex items-center text-green-400 text-sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Subscribed! Welcome to our newsletter.</span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="flex items-center text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>

      <p className="text-xs text-gray-400">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
