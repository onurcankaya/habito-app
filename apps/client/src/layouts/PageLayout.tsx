import { Outlet } from "react-router-dom";
import AppHeader from "@/components/shared/AppHeader";

function PageWrapper() {
  return (
    <div className="max-w-2xl mx-auto px-8 mt-10">
      <Outlet />
    </div>
  );
}

export default function PageLayout() {
  return (
    <div className="h-full mb-20">
      <AppHeader />
      <PageWrapper />
    </div>
  );
}
