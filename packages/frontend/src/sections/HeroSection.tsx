import { HeroContent } from '@/components/organisms/HeroContent'

interface HeroSectionProps {
  user: {
    name: string
    headline: string
    email: string
    thumbnailUrl?: string | null
  }
}

export function HeroSection({ user }: HeroSectionProps) {
  return (
    <section className="min-h-screen">
      <HeroContent user={user} />
    </section>
  )
}
