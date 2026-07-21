import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUserRequest } from "@/lib/schemas/auth";
import { useLoginUser } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        console.error("Failed to log in user:", error);
        setLoginUserError(
          error instanceof Error ? error : new Error("Failed to log in user"),
        );
      },
    });
  }

  return (
    <div>
      {loginUserError && (
        <p className="text-destructive text-sm">{loginUserError.message}</p>
      )}

      <h2 className="mb-4">Login</h2>

      <form onSubmit={handleSubmit(handleLoginUser)} className="space-y-6">
        <Input
          id="email"
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex flex-col space-y-4">
          <Button type="submit" variant="primary" disabled={isPending}>
            Login
          </Button>

          <span className="text-xs">
            Don't have a user?{" "}
            <Link to="/register">Click here to sign up.</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
