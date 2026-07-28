import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppTitle } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { removeToken } from "@/utils/token";

export default function AppHeader() {
  const { data: user, isLoading, error } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      removeToken();
      navigate("/login");
    }
  }, [error]);

  function handleLogout() {
    removeToken();
    navigate("/login");
  }

  return (
    <div className="h-[80px] flex items-center justify-between border-b px-6">
      <div className="w-[100px]">
        <h4 className="text-left">{isLoading ? "..." : user?.first_name}</h4>
      </div>

      <AppTitle />

      <div className="w-[100px]">
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
