/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static export: the app is client-rendered with no server features,
  // so `next build` emits a plain `out/` folder that Netlify serves directly —
  // no adapter or serverless functions required.
  output: "export",
  images: { unoptimized: true },
  // Emit /section/ style paths as folders with index.html (nicer static hosting).
  trailingSlash: true,
};

export default nextConfig;
