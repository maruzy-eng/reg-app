import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

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

const BUCKET = "lp-assets";

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

const images = [
  {
    name: "checkmate-logo-color.jpg",
    folder: "logos",
    url: "https://checkmateproperty.com/wp-content/uploads/2023/04/checkmate-logo-color.jpg",
  },

  {
    name: "17.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/17.png",
  },
  {
    name: "18.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/18.png",
  },
  {
    name: "19.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/19.png",
  },
  {
    name: "20.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/20.png",
  },
  {
    name: "21.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/21.png",
  },
  {
    name: "22.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/22.png",
  },
  {
    name: "23.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/23.png",
  },
  {
    name: "24.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/24.png",
  },
  {
    name: "25.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/25.png",
  },
  {
    name: "26.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/26.png",
  },
  {
    name: "27.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/27.png",
  },
  {
    name: "28.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/28.png",
  },
  {
    name: "29.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/29.png",
  },
  {
    name: "30.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/30.png",
  },
  {
    name: "31.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/31.png",
  },
  {
    name: "32.png",
    folder: "lp/flip-house",
    url: "http://checkmateproperty.com/wp-content/uploads/2026/05/32.png",
  },

  {
    name: "youtube-rvdnzjzm7qa.jpg",
    folder: "lp/videos",
    url: "https://img.youtube.com/vi/RvdnzJzm7QA/hqdefault.jpg",
  },
  {
    name: "youtube-1b3rs5mr7-e.jpg",
    folder: "lp/videos",
    url: "https://img.youtube.com/vi/1B3Rs5mR7-E/hqdefault.jpg",
  },
  {
    name: "youtube-onyo9rseov8.jpg",
    folder: "lp/videos",
    url: "https://img.youtube.com/vi/Onyo9rSEoV8/hqdefault.jpg",
  },
];

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

  const bucketExists = buckets.some((bucket) => bucket.name === BUCKET);

  if (bucketExists) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: "20MB",
  });

  if (createError) {
    throw new Error(`Unable to create bucket ${BUCKET}: ${createError.message}`);
  }

  console.log(`Bucket created: ${BUCKET}`);
}

async function downloadImage(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}. Status: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
}

async function uploadImage(image) {
  const filePath = `${image.folder}/${image.name}`;
  const contentType = getContentType(image.name);

  console.log(`Downloading: ${image.url}`);

  const buffer = await downloadImage(image.url);

  console.log(`Uploading: ${filePath}`);

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
    oldUrl: image.url,
    newUrl: data.publicUrl,
  };
}

async function main() {
  console.log("Using Supabase URL:", SUPABASE_URL);
  console.log("Bucket:", BUCKET);

  await ensureBucketExists();

  const results = [];

  for (const image of images) {
    try {
      const result = await uploadImage(image);
      results.push(result);

      console.log(`OK: ${result.newUrl}`);
    } catch (error) {
      console.error(`ERROR: ${image.url}`);

      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  console.log("\n\n==== URL MAP ====\n");

  for (const result of results) {
    console.log(`"${result.oldUrl}": "${result.newUrl}",`);
  }

  console.log("\n==== CONSTANTS ====\n");

  console.log(
    `export const LP_ASSETS_URL = "${SUPABASE_URL}/storage/v1/object/public/${BUCKET}";`,
  );

  console.log("\n==== READY ====");
}

main();