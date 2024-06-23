import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const goToGroups = async (id_event: string,id: string ,router: AppRouterInstance) => {
  router.push(`/eventos/${id_event}/${id}/grupos`);
};
