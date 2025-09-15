"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  business: string;
  message: string;
  subscribeNewsletter: boolean;
}

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    business: "",
    message: "",
    subscribeNewsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          business: "",
          message: "",
          subscribeNewsletter: false,
        });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      subscribeNewsletter: checked
    }));
  };

  return (
    <Card className={`card ${className || ""}`}>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name *
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bobby Raymond"
                required
                className="bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
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
                className="bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="business" className="text-sm font-medium text-foreground">
              Business
            </label>
            <Input
              id="business"
              name="business"
              value={formData.business}
              onChange={handleChange}
              placeholder="Brain Body Soul Therapy and Wellness"
              className="bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
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
              className="bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.subscribeNewsletter}
              onCheckedChange={handleCheckboxChange}
              className="border-muted-foreground/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor="newsletter"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Subscribe to our newsletter for AI insights and automation tips
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>

          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <p className="text-green-800 dark:text-green-200 text-sm">
                  Thanks! We&apos;ll reach out within 1 business day.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <p className="text-red-800 dark:text-red-200 text-sm">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}