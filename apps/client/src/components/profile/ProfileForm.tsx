import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@/components/ui";
import { updateUserSchema, type UpdateUserRequest } from "@/lib/schemas/user";
import type { User } from "@/types";

type ProfileFormProps = {
  user: User;
  updateUser: (userPayload: UpdateUserRequest) => void;
  isLoading: boolean;
};

export default function ProfileForm({
  user,
  updateUser,
  isLoading,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserRequest>({
    resolver: zodResolver(updateUserSchema),
    values: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });

  return (
    <form onSubmit={handleSubmit(updateUser)} className="space-y-6">
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

      <Button type="submit" size="sm" disabled={isLoading} className="w-full">
        Save Changes
      </Button>
    </form>
  );
}
