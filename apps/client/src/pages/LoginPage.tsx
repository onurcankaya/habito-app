import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUserRequest } from "@/lib/schemas/auth";
import { Button, Input } from "@/components/ui";
import { useLoginUser } from "@/hooks";

export default function LoginPage() {
  const [loginUserError, setLoginUserError] = useState<Error | null>();

  const { mutate: loginUser, isPending } = useLoginUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserRequest>({
    resolver: zodResolver(loginUserSchema),
  });

  const navigate = useNavigate();

  function handleLoginUser(loginUserPayload: LoginUserRequest) {
    loginUser(loginUserPayload, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("Failed to log in user: ", error);
        setLoginUserError(
          error instanceof Error ? error : new Error("Failed to log in user"),
        );
      },
    });
  }

  return (
    <div className="space-y-6">
      {loginUserError && (
        <p className="text-destructive text-sm">{loginUserError.message}</p>
      )}

      <div className="flex flex-col items-start gap-1">
        <h2>Welcome back</h2>
        <p className="body-3">Log in to keep your streaks alive.</p>
      </div>

      <form onSubmit={handleSubmit(handleLoginUser)} className="space-y-4">
        <Input
          id="email"
          label="Email"
          placeholder="you@email.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          id="password"
          label="Password"
          placeholder="********"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex flex-col space-y-3">
          <Button
            type="submit"
            size="sm"
            variant="primary"
            disabled={isPending}
          >
            Log in
          </Button>

          <span className="body-3">
            Don't have an account?{" "}
            <Link to="/register" className="inline-link">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
