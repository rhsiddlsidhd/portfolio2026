interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className={className}>
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo/Name */}
        <a
          href="#"
          className="text-lg font-semibold text-foreground transition-colors hover:text-primary"
        >
          Portfolio
        </a>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
