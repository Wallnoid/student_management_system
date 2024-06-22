import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const goToActivities = async (id: string, router: AppRouterInstance) => {
  router.push(`/eventos/${id}`);
};
