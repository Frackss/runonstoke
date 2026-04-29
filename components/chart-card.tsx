import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logger } from "@/lib/logger";

type ChartCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
};

export function ChartCard({ title, description, children, className }: ChartCardProps) {
  if (!children) {
    logger.warn("chart", `Chart ${title} rendered without children.`);
  }

  return (
    <Card className={className ?? "min-h-[260px] overflow-hidden"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[210px]">{children}</CardContent>
    </Card>
  );
}
