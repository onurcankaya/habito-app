import { Alert, AlertDescription } from "@/components/ui";

type ErrorMessageProps = {
  error: Error;
};

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <Alert variant="destructive">
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}
