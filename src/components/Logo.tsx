import { Languages } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export function Logo({ size = "md", variant = "dark" }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-2xl" },
    lg: { icon: 48, text: "text-4xl" },
  };

  const colors = {
    light: "text-primary-foreground",
    dark: "text-primary",
  };

  return (
    <div className={`flex items-center gap-3 ${colors[variant]}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg" />
        <div className="relative bg-gradient-accent p-2 rounded-xl shadow-accent">
          <Languages size={sizes[size].icon} className="text-accent-foreground" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-extrabold ${sizes[size].text} leading-tight`}>
          Next Idiomas
        </span>
        <span className="text-xs font-medium opacity-70 tracking-wider uppercase">
          Language School
        </span>
      </div>
    </div>
  );
}
