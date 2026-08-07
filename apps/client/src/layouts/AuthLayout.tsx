import { Outlet } from "react-router-dom";
import { AppTitle } from "@/components/shared";

function AuthHeader() {
  return (
    <div className="h-[80px] flex items-center justify-center border-b">
      <AppTitle />
    </div>
  );
}

function AuthFormWrapper() {
  return (
    <div className="max-w-lg mx-6 sm:mx-auto p-6 bg-card border rounded-lg mt-20">
      <Outlet />
    </div>
  );
}

export default function AuthLayout() {
  return (
    <div className="h-screen">
      <AuthHeader />
      <AuthFormWrapper />
    </div>
  );
}
