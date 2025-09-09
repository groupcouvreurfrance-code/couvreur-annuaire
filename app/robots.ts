import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 2, // 2 secondes entre chaque requête pour tous
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 1, // Plus rapide pour Google
      },
      {
        userAgent: "gptbot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 120, // 120 secondes - il a abusé !
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 30,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 30,
      },
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 45, // Meta AI aussi
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 30,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 20,
      },
      {
        userAgent: "oai-searchbot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
        crawlDelay: 60, // OpenAI SearchBot aussi
      },
    ],
    sitemap: "https://www.couvreur-groupefrance.com/sitemap.xml",
  }
}