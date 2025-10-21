import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ajyalink",
    short_name: "Ajyalink",
    description: "Bridging generations through mutual learning and community",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0369a1",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

