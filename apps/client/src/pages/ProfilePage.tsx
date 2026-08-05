import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, QueryState } from "@/components/shared";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
} from "@/components/ui";
import { useUser, useUpdateUser } from "@/hooks";
import { updateUserSchema, type UpdateUserRequest } from "@/lib/schemas/user";
import { QUERY_KEYS } from "@/constants";

export default function ProfilePage() {
  const [updateUserError, setUpdateUserError] = useState<Error | null>();

  const { data: user, isPending: isLoadingUser, error: userError } = useUser();
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserRequest>({
    resolver: zodResolver(updateUserSchema),
    values: user
      ? {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        }
      : undefined,
  });

  function handleUpdateUser(updateUserPayload: UpdateUserRequest) {
    const payload = { ...updateUserPayload };

    if (!payload.password) delete payload.password;

    updateUser(payload, {
      onError: (error) => {
        console.error("Failed to update user: ", error);
        setUpdateUserError(
          error instanceof Error ? error : new Error("Failed to update user"),
        );
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {updateUserError && <ErrorMessage error={updateUserError} />}

        <QueryState
          isLoading={isLoadingUser}
          error={userError}
          queryKeys={[QUERY_KEYS.user]}
        >
          <form onSubmit={handleSubmit(handleUpdateUser)} className="space-y-6">
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

            <Button
              type="submit"
              size="sm"
              disabled={isUpdatingUser}
              className="w-full"
            >
              Save Changes
            </Button>
          </form>
        </QueryState>
      </CardContent>
    </Card>
  );
}
