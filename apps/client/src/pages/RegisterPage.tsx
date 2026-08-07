import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components/ui";
import { useRegisterUser } from "@/hooks";
import {
  registerUserSchema,
  type RegisterUserRequest,
} from "@/lib/schemas/auth";

export default function RegisterPage() {
  const [registerUserError, setRegisterUserError] = useState<Error | null>();

  const { mutate: registerUser, isPending } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserRequest>({
    resolver: zodResolver(registerUserSchema),
  });

  const navigate = useNavigate();

  function handleRegisterUser(registerUserPayload: RegisterUserRequest) {
    registerUser(registerUserPayload, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("Failed to register user:", error);
        setRegisterUserError(
          error instanceof Error ? error : new Error("Failed to register user"),
        );
      },
    });
  }

  return (
    <div className="space-y-6">
      {registerUserError && (
        <p className="text-destructive text-sm">{registerUserError.message}</p>
      )}

      <div className="flex flex-col items-start gap-1">
        <h2>Create your account</h2>
        <p className="body-3">Start building habits that stick.</p>
      </div>

      <form onSubmit={handleSubmit(handleRegisterUser)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="first_name"
            label="First Name"
            placeholder="Jamie"
            {...register("first_name")}
            error={errors.first_name?.message}
          />

          <Input
            id="last_name"
            label="Last Name"
            placeholder="Rivera"
            {...register("last_name")}
            error={errors.last_name?.message}
          />
        </div>

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
            Create account
          </Button>

          <span className="body-3">
            Already have an account?{" "}
            <Link to="/login" className="inline-link">
              Log in
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
