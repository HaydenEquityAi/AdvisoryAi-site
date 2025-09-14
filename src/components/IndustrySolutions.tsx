import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Hammer, 
  Home, 
  Store, 
  Briefcase, 
  Users 
} from "lucide-react";

export default function IndustrySolutions() {
  const industries = [
    {
      icon: Heart,
      title: "Therapists",
      description: "Streamline client scheduling, automate intake forms, and generate session notes with AI-powered workflows."
    },
    {
      icon: Hammer,
      title: "Contractors",
      description: "Automate project estimates, track materials, and manage client communications to reduce admin time."
    },
    {
      icon: Home,
      title: "Real Estate",
      description: "Generate property descriptions, automate lead follow-up, and create market reports with AI assistance."
    },
    {
      icon: Store,
      title: "Local Retail",
      description: "Optimize inventory management, personalize customer experiences, and automate order processing."
    },
    {
      icon: Briefcase,
      title: "Professional Services",
      description: "Automate client onboarding, streamline document management, and enhance client reporting capabilities."
    },
    {
      icon: Users,
      title: "Agencies",
      description: "Scale client work with automated reporting, project tracking, and team collaboration tools."
    }
  ];

  return (
    <section className="section bg-muted/30">
      <div className="container-balanced">
        <div className="text-center space-y-4 mb-16">
          <h2 className="h2">Customized AI Solutions</h2>
          <p className="lead mx-auto">
            We design automation tailored to your industry—so you get results that fit your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Card key={industry.title} className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <industry.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="h3">{industry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {industry.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
