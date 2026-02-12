import { Separator } from '@/components/atoms/separator'

interface FooterProps {
  name?: string
  className?: string
}

export function Footer({ name = 'Portfolio', className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={className}>
      <div className="container mx-auto px-4 md:px-8">
        <Separator className="mb-8" />

        <div className="flex flex-col items-center justify-between gap-4 pb-8 text-sm text-muted-foreground md:flex-row">
          {/* Copyright */}
          <p>
            © {currentYear} {name}. Built with React + TypeScript
          </p>

          {/* Tech Stack (optional) */}
          <p className="text-xs">
            Powered by Vite, Tailwind CSS, shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  )
}
