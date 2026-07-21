import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerUserSchema,
  type RegisterUserRequest,
} from "@/lib/schemas/auth";
import { useRegisterUser } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div>
      {registerUserError && (
        <p className="text-destructive text-sm">{registerUserError.message}</p>
      )}

      <h2 className="mb-4">Register</h2>

      <form onSubmit={handleSubmit(handleRegisterUser)} className="space-y-6">
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

        <Input
          id="first_name"
          label="First Name"
          {...register("first_name")}
          error={errors.first_name?.message}
        />

        <Input
          id="last_name"
          label="Last Name"
          {...register("last_name")}
          error={errors.last_name?.message}
        />

        <div className="flex flex-col space-y-4">
          <Button type="submit" variant="primary" disabled={isPending}>
            Register
          </Button>

          <span className="text-xs">
            Already have a user? <Link to="/login">Click here to login.</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
