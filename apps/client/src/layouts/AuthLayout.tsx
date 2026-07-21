import { Outlet } from "react-router-dom";

function AuthHeader() {
  return (
    <div className="h-[80px] flex items-center justify-center border-b">
      <h2>Habit Tracker</h2>
    </div>
  );
}

function AuthFormWrapper() {
  return (
    <div className="max-w-lg mx-auto p-8 bg-card border rounded-lg mt-20">
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
