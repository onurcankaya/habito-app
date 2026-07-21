import { Outlet } from "react-router-dom";
import AppHeader from "@/components/shared/AppHeader";

function PageWrapper() {
  return (
    <div className="max-w-lg mx-auto p-8 bg-black border rounded-lg mt-20">
      <Outlet />
    </div>
  );
}

export default function PageLayout() {
  return (
    <div className="h-screen">
      <AppHeader />
      <PageWrapper />
    </div>
  );
}
