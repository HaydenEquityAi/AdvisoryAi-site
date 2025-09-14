import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lightbulb, Target } from "lucide-react";

export default function WhyAdvisoryAi() {
  return (
    <section className="section">
      <div className="container-balanced">
        <div className="text-center space-y-4 mb-16">
          <h2 className="h2">About AdvisoryAi</h2>
          <p className="lead mx-auto">
            Founded in Oklahoma and proudly based in Tulsa, we help small and mid-sized businesses unlock growth through practical AI automation—built into the tools you already use.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="h3">Our Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                We focus on practical AI solutions that integrate seamlessly with your existing workflow, not complex systems that require major changes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="h3">What Sets Us Apart</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Local expertise with global technology. We understand Tulsa businesses and build solutions that work for our community&apos;s unique needs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="h3">Comprehensive Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                <ul className="space-y-2 text-sm">
                  <li>• Business Automation</li>
                  <li>• Workflow Optimization</li>
                  <li>• Business Intelligence (dashboards & KPIs)</li>
                  <li>• AI Consulting & Team Training</li>
                </ul>
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="h3 mb-6">Who We Serve</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Therapists",
              "Contractors", 
              "Real Estate",
              "Local Retail",
              "Professional Services",
              "Agencies"
            ].map((industry) => (
              <Badge key={industry} variant="secondary" className="px-4 py-2 text-sm">
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
