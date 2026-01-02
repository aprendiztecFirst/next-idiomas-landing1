import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "primary" | "accent" | "secondary" | "success";
  onClick: () => void;
  delay?: number;
}

const colorStyles = {
  primary: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    hoverBorder: "hover:border-primary/40",
  },
  accent: {
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    hoverBorder: "hover:border-accent/40",
  },
  secondary: {
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
    hoverBorder: "hover:border-secondary-foreground/20",
  },
  success: {
    iconBg: "bg-success/10",
    iconColor: "text-success",
    hoverBorder: "hover:border-success/40",
  },
};

export function RoleCard({ icon: Icon, title, description, color, onClick, delay = 0 }: RoleCardProps) {
  const styles = colorStyles[color];

  return (
    <Card
      variant="interactive"
      className={`group animate-slide-up ${styles.hoverBorder}`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${styles.iconBg} transition-transform duration-200 group-hover:scale-110`}>
            <Icon size={24} className={styles.iconColor} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
