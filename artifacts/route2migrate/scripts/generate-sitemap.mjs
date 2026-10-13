import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(projectRoot, "public");
const outputDirectory = path.join(projectRoot, "dist");
const canonicalHtml = await readFile(path.join(projectRoot, "index.html"), "utf8");
const robotsTxt = await readFile(path.join(publicDirectory, "robots.txt"), "utf8");
const existingSitemap = await readFile(path.join(publicDirectory, "sitemap.xml"), "utf8");
const appSource = await readFile(path.join(projectRoot, "src", "App.tsx"), "utf8");
const blogSource = await readFile(path.join(projectRoot, "src", "data", "blogPosts.tsx"), "utf8");

const canonicalMatch = canonicalHtml.match(
  /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["'](https:\/\/[^"']+)["'])[^>]*>/i,
);
if (!canonicalMatch) {
  throw new Error("Could not determine the HTTPS canonical URL from index.html.");
}

const canonicalUrl = new URL(canonicalMatch[1]);
if (canonicalUrl.pathname !== "/" || canonicalUrl.search || canonicalUrl.hash) {
  throw new Error("The canonical URL in index.html must point to the website root.");
}
const siteOrigin = canonicalUrl.origin;
const sitemapUrl = new URL("/sitemap.xml", siteOrigin).href;
const robotsSitemap = robotsTxt.match(/^\s*Sitemap:\s*(\S+)\s*$/im)?.[1];
if (robotsSitemap !== sitemapUrl) {
  throw new Error(`robots.txt must declare the canonical sitemap URL: ${sitemapUrl}`);
}

const routePaths = [...appSource.matchAll(/<Route\b(?=[^>]*\bpath=["']([^"']+)["'])[^>]*>/g)]
  .map((match) => match[1]);
if (!routePaths.includes("/blog/:slug")) {
  throw new Error("Could not find the /blog/:slug route in src/App.tsx.");
}

const eligiblePath = (pathname) =>
  pathname === "/" ||
  (/^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*\/?$/i.test(pathname) &&
    !/^\/(?:api|auth|admin|private|account)(?:\/|$)/i.test(pathname));

const paths = new Set();
for (const routePath of routePaths) {
  if (routePath.includes(":") || routePath.includes("*")) continue;
  if (eligiblePath(routePath)) paths.add(normalizePath(routePath));
}

const blogSlugs = new Set(
  [...blogSource.matchAll(/\bslug\s*:\s*["']([a-z0-9]+(?:-[a-z0-9]+)*)["']/gi)].map(
    (match) => match[1],
  ),
);

const bloggingDirectory = path.join(projectRoot, "src", "pages", "blogging");
const bloggingFiles = (await readdir(bloggingDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
  .map((entry) => entry.name);
for (const fileName of bloggingFiles) {
  const source = await readFile(path.join(bloggingDirectory, fileName), "utf8");
  const postDataStart = source.search(/\bexport\s+(?:const|let|var)\s+postData\b/);
  if (postDataStart === -1) continue;
  const slug = source
    .slice(postDataStart)
    .match(/\bslug\s*:\s*["']([a-z0-9]+(?:-[a-z0-9]+)*)["']/i)?.[1];
  if (slug) blogSlugs.add(slug);
}

for (const slug of blogSlugs) {
  paths.add(`/blog/${slug}`);
}

const previousEntries = new Map();
for (const entry of existingSitemap.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)) {
  const loc = entry[1].match(/<loc>\s*([^<]+)\s*<\/loc>/i)?.[1]?.trim();
  if (!loc) continue;

  let previousUrl;
  try {
    previousUrl = new URL(loc);
  } catch {
    continue;
  }
  if (previousUrl.origin !== siteOrigin || previousUrl.search || previousUrl.hash) continue;

  const metadata = {};
  for (const field of ["changefreq", "priority"]) {
    const value = entry[1].match(new RegExp(`<${field}>\\s*([^<]+)\\s*</${field}>`, "i"))?.[1]?.trim();
    if (value) metadata[field] = value;
  }
  previousEntries.set(normalizePath(previousUrl.pathname), metadata);
}

const xmlEscape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const urls = [...paths]
  .sort((left, right) => (left === "/" ? -1 : right === "/" ? 1 : left.localeCompare(right)))
  .map((pathname) => {
    const location = new URL(pathname, siteOrigin).href;
    const metadata = previousEntries.get(pathname) ?? {
      changefreq: pathname === "/" || pathname === "/blog" ? "weekly" : "monthly",
      priority: pathname === "/" ? "1.0" : pathname === "/services" || pathname === "/blog" ? "0.8" : "0.7",
    };
    return [
      "  <url>",
      `    <loc>${xmlEscape(location)}</loc>`,
      `    <changefreq>${xmlEscape(metadata.changefreq)}</changefreq>`,
      `    <priority>${xmlEscape(metadata.priority)}</priority>`,
      "  </url>",
    ].join("\n");
  });

if (new Set(urls.map((entry) => entry.match(/<loc>(.*?)<\/loc>/)?.[1])).size !== urls.length) {
  throw new Error("Duplicate sitemap URLs were generated.");
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

const sitemapPaths = [
  path.join(publicDirectory, "sitemap.xml"),
  path.join(outputDirectory, "sitemap.xml"),
];
await Promise.all(sitemapPaths.map((sitemapPath) => writeFile(sitemapPath, sitemap, "utf8")));
console.log(`Generated ${urls.length} sitemap URLs in public/sitemap.xml and dist/sitemap.xml`);

function normalizePath(pathname) {
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}
