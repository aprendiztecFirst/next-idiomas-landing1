import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  color?: "primary" | "accent" | "success" | "warning";
}

const colorStyles = {
  primary: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  accent: {
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  success: {
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  warning: {
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
};

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeType = "neutral",
  color = "primary",
}: StatCardProps) {
  const styles = colorStyles[color];
  
  const changeColors = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={`text-sm font-medium ${changeColors[changeType]}`}>
                {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${styles.iconBg}`}>
            <Icon size={24} className={styles.iconColor} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
