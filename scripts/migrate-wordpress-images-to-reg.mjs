/**
 * Download all WordPress (wp-content/uploads) images referenced in the codebase
 * and upload them to the Supabase public bucket `reg`.
 *
 * Usage:
 *   node scripts/migrate-wordpress-images-to-reg.mjs
 *   node scripts/migrate-wordpress-images-to-reg.mjs --dry-run
 *   node scripts/migrate-wordpress-images-to-reg.mjs --write-map
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const BUCKET = "reg";
const SOURCE_ROOT = path.resolve(process.cwd(), "src");
const WP_URL_REGEX =
  /https?:\/\/(?:www\.)?checkmaterealestategroup\.com\/wp-content\/uploads\/[^\s"'`)\\]+/gi;

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");
const WRITE_MAP = args.has("--write-map");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  for (const line of content.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const equalIndex = trimmedLine.indexOf("=");

    if (equalIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, equalIndex).trim();
    let value = trimmedLine.slice(equalIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.resolve(process.cwd(), ".env.local"));
loadEnvFile(path.resolve(process.cwd(), ".env"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL. Add it to .env.local or .env.",
  );
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local or .env.",
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function walkFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "dist"
      ) {
        continue;
      }

      walkFiles(fullPath, files);
      continue;
    }

    if (/\.(ts|tsx|js|jsx|mjs|cjs|css|md|json|html)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeWpUrl(url) {
  try {
    const parsed = new URL(url.replace(/\\+$/, ""));
    parsed.hash = "";
    parsed.search = "";
    parsed.protocol = "https:";
    parsed.hostname = "checkmaterealestategroup.com";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return url;
  }
}

function collectWordpressUrls() {
  const files = walkFiles(SOURCE_ROOT);
  const urls = new Set();

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const matches = content.match(WP_URL_REGEX) || [];

    for (const match of matches) {
      urls.add(normalizeWpUrl(match));
    }
  }

  return [...urls].sort();
}

function storagePathFromWpUrl(url) {
  const parsed = new URL(url);
  // Keep the WordPress relative path under the bucket:
  // wp-content/uploads/2026/06/file.jpg
  const relative = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
  return relative;
}

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();

  if (ext === ".jpg" || ext === ".jpeg") {
    return "image/jpeg";
  }

  if (ext === ".png") {
    return "image/png";
  }

  if (ext === ".webp") {
    return "image/webp";
  }

  if (ext === ".gif") {
    return "image/gif";
  }

  if (ext === ".svg") {
    return "image/svg+xml";
  }

  return "application/octet-stream";
}

async function ensureBucketExists() {
  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(`Unable to list buckets: ${listError.message}`);
  }

  if (buckets.some((bucket) => bucket.name === BUCKET)) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: "50MB",
  });

  if (createError) {
    throw new Error(`Unable to create bucket ${BUCKET}: ${createError.message}`);
  }

  console.log(`Bucket created: ${BUCKET}`);
}

async function downloadImage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; CheckmateREGMigrator/1.0; +https://checkmateproperty.com)",
      Accept: "image/*,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url}. Status: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadImage(oldUrl) {
  const filePath = storagePathFromWpUrl(oldUrl);
  const contentType = getContentType(filePath);

  console.log(`Downloading: ${oldUrl}`);
  const buffer = await downloadImage(oldUrl);

  if (DRY_RUN) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    console.log(`[dry-run] Would upload ${buffer.length} bytes → ${filePath}`);
    return {
      oldUrl,
      newUrl: data.publicUrl,
      filePath,
      bytes: buffer.length,
      dryRun: true,
    };
  }

  console.log(`Uploading: ${filePath} (${buffer.length} bytes)`);

  const { error } = await supabase.storage.from(BUCKET).upload(filePath, buffer, {
    contentType,
    upsert: true,
    cacheControl: "31536000",
  });

  if (error) {
    throw new Error(`Upload failed for ${filePath}: ${error.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

  return {
    oldUrl,
    newUrl: data.publicUrl,
    filePath,
    bytes: buffer.length,
  };
}

async function main() {
  console.log("Using Supabase URL:", SUPABASE_URL);
  console.log("Bucket:", BUCKET);
  console.log("Mode:", DRY_RUN ? "dry-run" : "upload");

  const urls = collectWordpressUrls();

  console.log(`\nFound ${urls.length} WordPress image URL(s) in src/\n`);

  if (urls.length === 0) {
    console.log("Nothing to migrate.");
    return;
  }

  for (const url of urls) {
    console.log(`- ${url}`);
  }

  console.log("");

  if (!DRY_RUN) {
    await ensureBucketExists();
  }

  const results = [];
  const failures = [];

  for (const url of urls) {
    try {
      const result = await uploadImage(url);
      results.push(result);
      console.log(`OK: ${result.newUrl}\n`);
    } catch (error) {
      failures.push({
        url,
        error: error instanceof Error ? error.message : String(error),
      });
      console.error(`ERROR: ${url}`);
      console.error(error instanceof Error ? error.message : error);
      console.error("");
    }
  }

  console.log("\n==== URL MAP ====\n");

  for (const result of results) {
    console.log(`"${result.oldUrl}": "${result.newUrl}",`);
  }

  if (WRITE_MAP) {
    const mapPath = path.resolve(
      process.cwd(),
      "scripts/wordpress-to-reg-url-map.json",
    );
    fs.writeFileSync(
      mapPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          bucket: BUCKET,
          dryRun: DRY_RUN,
          mappings: Object.fromEntries(
            results.map((item) => [item.oldUrl, item.newUrl]),
          ),
          failures,
        },
        null,
        2,
      ),
    );
    console.log(`\nWrote map: ${mapPath}`);
  }

  console.log("\n==== SUMMARY ====");
  console.log(`Success: ${results.length}`);
  console.log(`Failed:  ${failures.length}`);
  console.log(
    `\nPublic base: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
