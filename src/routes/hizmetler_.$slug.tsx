import { createFileRoute, notFound } from "@tanstack/react-router";

import { ServicePage } from "@/components/ServicePage";
import { serviceBySlug } from "@/config/site.config";
import { serviceHead } from "@/lib/seo";

/**
 * Hizmet sayfaları config listesinden otomatik üretilir.
 * enabled:false olan hizmetin slug'ı 404 döner (serviceBySlug yalnızca
 * açık hizmetlere bakar), dolayısıyla kapalı hizmetin sayfası yoktur.
 */
export const Route = createFileRoute("/hizmetler_/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => (loaderData ? serviceHead(loaderData.service) : {}),
  component: ServiceRoute,
});

function ServiceRoute() {
  const { service } = Route.useLoaderData();
  return <ServicePage service={service} />;
}
