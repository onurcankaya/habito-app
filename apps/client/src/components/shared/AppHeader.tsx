import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Menu as MenuIcon,
  LayoutDashboard as DashboardIcon,
  ClipboardList as HabitsIcon,
  User as UserIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import { AppTitle } from "@/components/shared";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useUser } from "@/hooks";
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

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 transition-colors px-1.5 py-1 rounded-md ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-foreground hover:bg-accent"
    }`;

  return (
    <div className="min-h-[80px] flex items-center justify-between border-b sm:px-6 px-4">
      <div className="px-3 py-1.5 border-primary-dark border-2 rounded-full">
        <p className="text-xs font-bold">
          {isLoading
            ? "..."
            : `${user?.first_name[0]}${user?.last_name[0]}` || ""}
        </p>
      </div>

      <AppTitle />

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
          <MenuIcon className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="space-y-2">
          <NavLink to="/" end className={navLinkClassName}>
            <DashboardIcon className="h-4 w-4" />
            <span className="text-sm">Dashboard</span>
          </NavLink>
          <NavLink to="/habits" className={navLinkClassName}>
            <HabitsIcon className="h-4 w-4" />
            <span className="text-sm">Habits</span>
          </NavLink>
          <NavLink to="/profile" className={navLinkClassName}>
            <UserIcon className="h-4 w-4" />
            <span className="text-sm">Profile</span>
          </NavLink>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            disabled={isLoading}
          >
            <LogOutIcon className="h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
