import type { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RotateCcw as RetryIcon, Loader2 as Loader } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";

type QueryStateProps = {
  isLoading: boolean;
  error: Error | null;
  queryKeys: string[];
  children: ReactNode;
};

export default function QueryState({
  isLoading,
  error,
  queryKeys,
  children,
}: QueryStateProps) {
  const queryClient = useQueryClient();

  if (error) {
    return (
      <div className="w-full flex flex-1 items-center justify-center">
        <Card className="w-full border border-destructive rounded-md p-6">
          <CardContent className="flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-center text-destructive">
              {error.message}
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: queryKeys,
                });
              }}
              className="flex items-center gap-1"
            >
              <RetryIcon className="size-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex flex-1 items-center justify-center">
        <Card className="w-full flex flex-col items-center justify-center p-6">
          <CardContent>
            <Loader className="h-10 w-10 text-primary animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
