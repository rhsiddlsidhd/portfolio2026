import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Button } from "@/components/atoms/button";
import { Mail, Phone, Globe } from "lucide-react";

interface ContactSectionProps {
  email: string;
  phone?: string;
  blogUrl?: string;
}

export function ContactSection({ email, phone, blogUrl }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Get In Touch"
          subtitle="Feel free to reach out"
          className="mb-12"
        />

        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Email */}
          <Button variant="default" size="lg" asChild>
            <a href={`mailto:${email}`}>
              <Mail />
              Email Me
            </a>
          </Button>

          {/* Phone (optional) */}
          {phone && (
            <Button variant="outline" size="lg" asChild>
              <a href={`tel:${phone}`}>
                <Phone />
                Call Me
              </a>
            </Button>
          )}

          {/* Blog (optional) */}
          {blogUrl && (
            <Button variant="outline" size="lg" asChild>
              <a href={blogUrl} target="_blank" rel="noopener noreferrer">
                <Globe />
                Visit Blog
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
