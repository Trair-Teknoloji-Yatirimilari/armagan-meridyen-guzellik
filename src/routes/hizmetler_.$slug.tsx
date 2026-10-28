import { createFileRoute } from "@tanstack/react-router";

import { NotFoundPage, notFoundHead } from "@/components/NotFound";
import { markNotFoundResponse } from "@/lib/not-found-status";
import { ServicePage } from "@/components/ServicePage";
import { serviceBySlug } from "@/config/site.config";
import { serviceHead } from "@/lib/seo";

/**
 * Hizmet sayfaları config listesinden otomatik üretilir.
 * enabled:false olan hizmetin slug'ı 404 döner (serviceBySlug yalnızca
 * açık hizmetlere bakar), dolayısıyla kapalı hizmetin sayfası yoktur.
 */
export const Route = createFileRoute("/hizmetler_/$slug")({
  loader: async ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) {
      markNotFoundResponse();
      return { service: null };
    }
    return { service };
  },
  head: ({ loaderData }) =>
    loaderData?.service ? serviceHead(loaderData.service) : notFoundHead(),
  component: ServiceRoute,
});

function ServiceRoute() {
  const { service } = Route.useLoaderData();
  if (!service) return <NotFoundPage />;
  return <ServicePage service={service} />;
}
