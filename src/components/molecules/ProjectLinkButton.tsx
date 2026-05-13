import { LinkButton } from "@/components/molecules/LinkButton";
import { ExternalLink } from "lucide-react";

type LinkType = "deploy" | "github" | "notion";

const config: Record<
  LinkType,
  { label: string; icon: React.ReactNode; variant: "default" | "outline" }
> = {
  deploy: {
    label: "Live Demo",
    icon: <ExternalLink className="size-4" />,
    variant: "default",
  },
  github: {
    label: "GitHub",
    icon: (
      <img
        src="/images/skills/github.svg"
        alt="GitHub"
        className="size-4 dark:invert"
      />
    ),
    variant: "outline",
  },
  notion: {
    label: "Notion",
    icon: (
      <img
        src="/images/skills/notion.svg"
        alt="Notion"
        className="size-4 dark:invert"
      />
    ),
    variant: "outline",
  },
};

type ProjectLinkButtonProps = {
  url: string;
  type: LinkType;
  stopPropagation?: boolean;
};

export function ProjectLinkButton({
  url,
  type,
  stopPropagation = false,
}: ProjectLinkButtonProps) {
  const { label, icon, variant } = config[type];

  return (
    <LinkButton
      href={url}
      variant={variant}
      target="_blank"
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
    >
      {icon}
      {label}
    </LinkButton>
  );
}
