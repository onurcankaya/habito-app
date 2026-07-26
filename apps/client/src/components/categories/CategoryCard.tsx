import { Card, CardContent } from "@/components/ui";
import { Badge } from "@/components/shared";
import type { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <p className="body-2 font-bold">{category.title}</p>
            {category.description && (
              <p className="body-3">{category.description}</p>
            )}
          </div>
        </div>

        <Badge label={category.title} />
      </CardContent>
    </Card>
  );
}
