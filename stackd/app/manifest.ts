// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stackd",
    short_name: "Stackd",
    description: "Challenge your friends. Set stakes. No excuses.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#1A1816",
    theme_color: "#1A1816",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
