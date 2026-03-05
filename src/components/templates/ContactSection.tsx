import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Button } from "@/components/atoms/button";
import { Mail, Phone, Globe, ArrowUpRight } from "lucide-react";
import { SectionLayout } from "../layout/SectionLayout";

interface ContactSectionProps {
  email: string;
  phone?: string;
  blogUrl?: string;
}

export function ContactSection({ email, phone, blogUrl }: ContactSectionProps) {
  return (
    <SectionLayout id="contact-section" showSeparator={false}>
      <section className="bg-muted/30 relative overflow-hidden py-32 md:py-40">
        {/* Large ghost text background */}
        {/* Soft glow */}
        <div className="bg-chart-1/20 dark:bg-chart-1/12 pointer-events-none absolute top-1/2 -right-24 size-100 -translate-y-1/2 rounded-full blur-2xl" />

        <div className="relative container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground mb-4 font-mono text-xs font-semibold tracking-[0.3em] uppercase">
              05 — 함께 이야기 나누고 싶습니다
            </p>
            <SectionHeader
              title="연락처"
              subtitle="새로운 기회나 협업에 언제든 열려 있습니다. 편하게 연락주세요."
              className="mb-12"
            />
          </div>

          <div className="mx-auto flex max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button
              variant="default"
              size="lg"
              className="group w-full sm:w-auto"
              asChild
            >
              <a href={`mailto:${email}`}>
                <Mail className="shrink-0" />
                Email Me
                <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>

            {phone && (
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <a href={`tel:${phone}`}>
                  <Phone className="shrink-0" />
                  Call Me
                </a>
              </Button>
            )}

            {blogUrl && (
              <Button
                variant="outline"
                size="lg"
                className="group w-full sm:w-auto"
                asChild
              >
                <a href={blogUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="shrink-0" />
                  Visit Blog
                  <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}
