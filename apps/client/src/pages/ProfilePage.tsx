import { useState } from "react";
import { ErrorMessage, QueryState } from "@/components/shared";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { ProfileForm } from "@/components/profile";
import { useUser, useUpdateUser } from "@/hooks";
import { type UpdateUserRequest } from "@/lib/schemas/user";
import { QUERY_KEYS } from "@/constants";

export default function ProfilePage() {
  const [updateUserError, setUpdateUserError] = useState<Error | null>();

  const { data: user, isPending: isLoadingUser, error: userError } = useUser();
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();

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
          {user && (
            <ProfileForm
              user={user}
              updateUser={handleUpdateUser}
              isLoading={isUpdatingUser}
            />
          )}
        </QueryState>
      </CardContent>
    </Card>
  );
}
