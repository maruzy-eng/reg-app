import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvFile(filePath) {
  try {
    const raw = readFileSync(filePath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // optional
  }
}

loadEnvFile(resolve(root, ".env.local"));
loadEnvFile(resolve(root, ".env"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function slugifyPostTitle(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function contentToHtml(conteudo) {
  return conteudo
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br />")}</p>`)
    .join("\n");
}

function makeExcerpt(conteudo) {
  const first = conteudo.split(/\n\s*\n/).map((p) => p.trim()).find(Boolean) || "";
  return first.length > 220 ? `${first.slice(0, 217).trimEnd()}...` : first;
}

const items = JSON.parse(
  readFileSync(resolve(__dirname, "seed-real-estate-news.json"), "utf8"),
);

const now = Date.now();
const rows = items.map((item, index) => {
  const title = String(item.titulo || "").trim();
  const slug = slugifyPostTitle(title);
  const contentHtml = contentToHtml(String(item.conteudo || ""));
  const excerpt = makeExcerpt(String(item.conteudo || ""));
  const publishedAt = new Date(now - index * 60_000).toISOString();

  return {
    title,
    slug,
    excerpt,
    content_html: contentHtml,
    cover_image_url: String(item.imagem || "").trim() || null,
    status: "published",
    published_at: publishedAt,
    author_name: "Checkmate REG",
    category: "real-estate",
    tags: ["real-estate"],
    meta_title: title,
    meta_description: excerpt || null,
    sort_order: index + 1,
  };
});

const slugs = rows.map((row) => row.slug);

const { data: existing, error: existingError } = await supabase
  .from("reg_posts")
  .select("slug")
  .in("slug", slugs);

if (existingError) {
  throw new Error(`Failed to check existing posts: ${existingError.message}`);
}

const existingSlugs = new Set((existing || []).map((row) => row.slug));
const toInsert = rows.filter((row) => !existingSlugs.has(row.slug));
const skipped = rows.length - toInsert.length;

if (toInsert.length === 0) {
  console.log(`Nothing to insert. ${skipped} posts already exist.`);
  process.exit(0);
}

const { data, error } = await supabase
  .from("reg_posts")
  .insert(toInsert)
  .select("id, slug, title");

if (error) {
  throw new Error(`Failed to insert posts: ${error.message}`);
}

console.log(
  `Inserted ${data?.length || 0} posts (skipped ${skipped} existing). Category: real-estate`,
);
for (const post of data || []) {
  console.log(`- ${post.slug}`);
}
