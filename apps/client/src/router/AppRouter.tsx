import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  ActivitiesPage,
  ActivityPage,
  HabitsPage,
  HabitPage,
  CategoriesPage,
  CategoryPage,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />

        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="activities/:id" element={<ActivityPage />} />

        <Route path="habits" element={<HabitsPage />} />
        <Route path="habits/:id" element={<HabitPage />} />

        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<CategoryPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
