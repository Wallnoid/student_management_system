import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const goToTasks = async (id: string, router: AppRouterInstance) => {
  router.push(`/tareas/${id}`);
};
