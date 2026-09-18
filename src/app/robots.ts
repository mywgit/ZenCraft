import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/my-orders/", "/order-success/", "/api/"],
    },
    sitemap: "https://zen.puretoolhub.com/sitemap.xml",
  };
}
