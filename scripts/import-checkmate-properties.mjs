import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_SOURCE_FILE = "scripts/properties-import-source.html";
const MEDIA_BUCKET = process.env.PROPERTY_MEDIA_BUCKET || "property-media";

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContent = fs.readFileSync(envPath, "utf8");

  for (const line of envContent.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();

    if (!key || process.env[key]) {
      continue;
    }

    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

loadEnvFile();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
}

if (!serviceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

function cleanString(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function nullableString(value) {
  const cleaned = cleanString(value);

  return cleaned || null;
}

function slugify(value) {
  return cleanString(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseCurrency(value) {
  const cleaned = cleanString(value);

  if (!cleaned) {
    return null;
  }

  const onlyDigits = cleaned.replace(/[^\d]/g, "");

  if (!onlyDigits) {
    return null;
  }

  const numberValue = Number(onlyDigits);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function parseNumber(value) {
  const cleaned = cleanString(value);

  if (!cleaned) {
    return null;
  }

  const normalized = cleaned.replace(/,/g, "").replace(/[^\d.]/g, "");
  const numberValue = Number(normalized);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function parseLotSizeToSqft(value) {
  const cleaned = cleanString(value).toLowerCase();

  if (!cleaned) {
    return null;
  }

  const numberValue = parseNumber(cleaned);

  if (numberValue === null) {
    return null;
  }

  if (cleaned.includes("sqft") || cleaned.includes("sq ft")) {
    return Math.round(numberValue);
  }

  if (numberValue > 0 && numberValue <= 100) {
    return Math.round(numberValue * 43560);
  }

  return Math.round(numberValue);
}

function parseAddressFromTitle(title) {
  const parts = cleanString(title)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const addressLine1 = parts[0] || title;
  const city = parts[1] || "";
  const stateZip = parts[2] || "";

  const stateZipMatch = stateZip.match(/^([A-Za-z]{2})\s+(.+)$/);

  return {
    addressLine1,
    city,
    state: stateZipMatch?.[1] || "MA",
    zipCode: stateZipMatch?.[2] || "",
  };
}

function mapStatus(value) {
  const cleaned = cleanString(value).toLowerCase();

  if (cleaned.includes("sold")) {
    return "sold";
  }

  if (cleaned.includes("progress")) {
    return "in_progress";
  }

  if (cleaned.includes("contract")) {
    return "under_contract";
  }

  if (cleaned.includes("archive")) {
    return "archived";
  }

  if (cleaned.includes("draft")) {
    return "draft";
  }

  return "available";
}

function mapPropertyType(property) {
  const sourceType = cleanString(property.type).toLowerCase();
  const propertyType = cleanString(
    property.propertyType || property["Property Type"],
  ).toLowerCase();

  if (sourceType.includes("new construction")) {
    return "new_construction";
  }

  if (
    sourceType.includes("renovation") ||
    sourceType.includes("flip") ||
    propertyType.includes("investment") ||
    propertyType.includes("value-add")
  ) {
    return "flip";
  }

  if (propertyType.includes("multi")) {
    return "multi_family";
  }

  if (propertyType.includes("condo")) {
    return "condo";
  }

  if (propertyType.includes("townhouse")) {
    return "townhouse";
  }

  if (propertyType.includes("commercial")) {
    return "commercial";
  }

  if (propertyType.includes("land")) {
    return "land";
  }

  return "single_family";
}

function normalizeUrl(value) {
  const cleaned = cleanString(value);

  if (!cleaned) {
    return "";
  }

  return cleaned.replace(/^http:\/\//i, "https://");
}

function uniqueUrls(urls) {
  const set = new Set();

  for (const url of urls || []) {
    const normalized = normalizeUrl(url);

    if (normalized) {
      set.add(normalized);
    }
  }

  return Array.from(set);
}

function getExtensionFromUrl(url, fallbackExtension = "bin") {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const extension = path.extname(pathname).replace(".", "").toLowerCase();

    if (extension) {
      return extension;
    }
  } catch {}

  return fallbackExtension;
}

function getFilenameFromUrl(url, fallbackName) {
  try {
    const parsedUrl = new URL(url);
    const basename = path.basename(parsedUrl.pathname);

    if (basename && basename.includes(".")) {
      return basename;
    }
  } catch {}

  return fallbackName;
}

function getContentTypeFromExtension(extension) {
  const normalized = extension.toLowerCase();

  const types = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    mp4: "video/mp4",
    mov: "video/quicktime",
    webm: "video/webm",
    pdf: "application/pdf",
  };

  return types[normalized] || "application/octet-stream";
}

async function ensureBucket(bucketName) {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(`Could not list buckets: ${listError.message}`);
  }

  const exists = buckets.some((bucket) => bucket.name === bucketName);

  if (exists) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(bucketName, {
    public: true,
  });

  if (createError) {
    throw new Error(`Could not create bucket ${bucketName}: ${createError.message}`);
  }
}

async function downloadAndUploadMedia({
  url,
  slug,
  folder,
  index,
  fallbackExtension,
}) {
  const normalizedUrl = normalizeUrl(url);

  if (!normalizedUrl) {
    return null;
  }

  const extension = getExtensionFromUrl(normalizedUrl, fallbackExtension);
  const originalFilename = getFilenameFromUrl(
    normalizedUrl,
    `${folder}-${index}.${extension}`,
  );

  const safeFilename = originalFilename
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const storagePath = `properties/${slug}/${folder}/${String(index).padStart(
    3,
    "0",
  )}-${safeFilename}`;

  try {
    console.log(`Downloading ${normalizedUrl}`);

    const response = await fetch(normalizedUrl, {
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 CheckmatePropertyImporter/1.0",
      },
    });

    if (!response.ok) {
      console.warn(
        `Download failed ${response.status} ${response.statusText}: ${normalizedUrl}`,
      );

      return normalizedUrl;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType =
      response.headers.get("content-type") ||
      getContentTypeFromExtension(extension);

    const { error: uploadError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(storagePath, buffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.warn(`Upload failed for ${normalizedUrl}: ${uploadError.message}`);
      return normalizedUrl;
    }

    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(storagePath);

    return data.publicUrl;
  } catch (error) {
    console.warn(`Media import failed for ${normalizedUrl}: ${error.message}`);
    return normalizedUrl;
  }
}

function parseSourceFile(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Source file not found: ${absolutePath}`);
  }

  const rawContent = fs.readFileSync(absolutePath, "utf8").trim();

  if (!rawContent) {
    throw new Error("Source file is empty.");
  }

  let jsonLike = rawContent;

  if (!jsonLike.startsWith("[")) {
    jsonLike = `[${jsonLike.replace(/,\s*$/, "")}]`;
  }

  jsonLike = jsonLike.replace(/,(\s*[\]}])/g, "$1");

  try {
    const parsed = JSON.parse(jsonLike);

    if (!Array.isArray(parsed)) {
      throw new Error("Parsed source is not an array.");
    }

    return parsed;
  } catch (error) {
    throw new Error(`Could not parse source file as JSON-like data: ${error.message}`);
  }
}

async function deleteExistingMedia(propertyId) {
  const tables = [
    "property_images",
    "property_videos",
    "property_documents",
    "property_features",
  ];

  for (const table of tables) {
    const { error } = await supabase.from(table).delete().eq("property_id", propertyId);

    if (error) {
      throw new Error(`Could not delete existing ${table}: ${error.message}`);
    }
  }
}

function buildDescription(property) {
  const descriptionItems = Array.isArray(property.description)
    ? property.description
    : [];

  return descriptionItems
    .map((item) => cleanString(item))
    .filter(Boolean)
    .join("\n\n");
}

async function importProperty(property, index) {
  const sourceId = cleanString(property.id);
  const title = cleanString(property.title);

  if (!title) {
    console.warn(`Skipping property at index ${index}: missing title`);
    return;
  }

  const slug = slugify(sourceId || title);
  const parsedAddress = parseAddressFromTitle(title);

  const bedrooms = parseNumber(property.beds || property.Bedrooms);
  const bathrooms = parseNumber(property.baths || property.Bathrooms);
  const sqft = parseNumber(property.sqft || property["Property Size"]);
  const lotSizeSqft = parseLotSizeToSqft(property.lot || property["Lot Size"]);
  const yearBuilt = parseNumber(property.yearBuilt || property["Year Built"]);
  const price = parseCurrency(property.price);

  const description = buildDescription(property);
  const shortDescription =
    description.split("\n\n").find((item) => item.length > 40) ||
    description.split("\n\n")[0] ||
    null;

  const galleryUrls = uniqueUrls([
    ...(Array.isArray(property.gallery) ? property.gallery : []),
    property.image,
  ]);

  const videoUrls = uniqueUrls([
    ...(Array.isArray(property.videos) ? property.videos : []),
    ...(Array.isArray(property.video) ? property.video : []),
  ]);

  const documentUrls = uniqueUrls([
    ...(Array.isArray(property.floorPlans) ? property.floorPlans : []),
    ...(Array.isArray(property.plan) ? property.plan : []),
    property.floorPlan,
  ]);

  const coverImageSource = normalizeUrl(property.image) || galleryUrls[0] || null;

  console.log("");
  console.log(`Importing ${index + 1}: ${title}`);

  const coverImageUrl = coverImageSource
    ? await downloadAndUploadMedia({
        url: coverImageSource,
        slug,
        folder: "cover",
        index: 0,
        fallbackExtension: "jpg",
      })
    : null;

  const propertyPayload = {
    title,
    slug,
    short_description: shortDescription,
    description,
    property_type: mapPropertyType(property),
    status: mapStatus(property.status),
    visibility: "public",
    address_line_1: parsedAddress.addressLine1,
    address_line_2: null,
    city: cleanString(property.city) || parsedAddress.city,
    state: parsedAddress.state || "MA",
    zip_code: parsedAddress.zipCode || null,
    country: "USA",
    price,
    purchase_price: null,
    rehab_estimate: null,
    projected_arv: null,
    projected_rent: null,
    projected_roi: null,
    bedrooms,
    bathrooms,
    sqft,
    lot_size_sqft: lotSizeSqft,
    year_built: yearBuilt,
    garage_spaces: null,
    parking_spaces: null,
    stories: null,
    neighborhood: null,
    county: null,
    mls_number: null,
    cover_image_url: coverImageUrl || coverImageSource,
    video_url: videoUrls[0] || null,
    virtual_tour_url: null,
    contact_cta_title: "Interested in this project?",
    contact_cta_description:
      "Connect with Checkmate Property to learn more about availability, pricing and next steps.",
    contact_button_label: "Contact Checkmate",
    contact_phone: null,
    contact_email: null,
    is_featured: index < 6,
    published_at: new Date().toISOString(),
    meta_title: title,
    meta_description: shortDescription,
  };

  const { data: insertedProperty, error: propertyError } = await supabase
    .from("properties")
    .upsert(propertyPayload, {
      onConflict: "slug",
    })
    .select("*")
    .single();

  if (propertyError) {
    throw new Error(`Could not upsert property ${title}: ${propertyError.message}`);
  }

  await deleteExistingMedia(insertedProperty.id);

  const imageRows = [];

  for (let imageIndex = 0; imageIndex < galleryUrls.length; imageIndex += 1) {
    const imageUrl = galleryUrls[imageIndex];

    const uploadedUrl = await downloadAndUploadMedia({
      url: imageUrl,
      slug,
      folder: "images",
      index: imageIndex,
      fallbackExtension: "jpg",
    });

    if (!uploadedUrl) {
      continue;
    }

    imageRows.push({
      property_id: insertedProperty.id,
      image_url: uploadedUrl,
      title: `${title} - Photo ${imageIndex + 1}`,
      alt_text: `${title} - Photo ${imageIndex + 1}`,
      caption: null,
      media_group: "gallery",
      width: null,
      height: null,
      position: imageIndex,
      is_cover:
        uploadedUrl === propertyPayload.cover_image_url ||
        imageUrl === coverImageSource ||
        imageIndex === 0,
    });
  }

  if (imageRows.length > 0) {
    const { error: imageError } = await supabase
      .from("property_images")
      .insert(imageRows);

    if (imageError) {
      throw new Error(`Could not insert images for ${title}: ${imageError.message}`);
    }
  }

  const videoRows = [];

  for (let videoIndex = 0; videoIndex < videoUrls.length; videoIndex += 1) {
    const videoUrl = videoUrls[videoIndex];

    const uploadedUrl = await downloadAndUploadMedia({
      url: videoUrl,
      slug,
      folder: "videos",
      index: videoIndex,
      fallbackExtension: "mp4",
    });

    if (!uploadedUrl) {
      continue;
    }

    videoRows.push({
      property_id: insertedProperty.id,
      title: `${title} - Video ${videoIndex + 1}`,
      description: null,
      video_url: uploadedUrl,
      provider: "upload",
      thumbnail_url: null,
      duration_seconds: null,
      video_type: "property_video",
      position: videoIndex,
      is_featured: videoIndex === 0,
    });
  }

  if (videoRows.length > 0) {
    const { error: videoError } = await supabase
      .from("property_videos")
      .insert(videoRows);

    if (videoError) {
      throw new Error(`Could not insert videos for ${title}: ${videoError.message}`);
    }
  }

  const documentRows = [];

  for (let documentIndex = 0; documentIndex < documentUrls.length; documentIndex += 1) {
    const documentUrl = documentUrls[documentIndex];

    const uploadedUrl = await downloadAndUploadMedia({
      url: documentUrl,
      slug,
      folder: "documents",
      index: documentIndex,
      fallbackExtension: "pdf",
    });

    if (!uploadedUrl) {
      continue;
    }

    documentRows.push({
      property_id: insertedProperty.id,
      title: `${title} - Floor Plan ${documentIndex + 1}`,
      description: "Architectural plan or project document.",
      file_url: uploadedUrl,
      file_type: "pdf",
      document_type: "floor_plan",
      button_label: "View PDF",
      position: documentIndex,
      is_public: true,
    });
  }

  if (documentRows.length > 0) {
    const { error: documentError } = await supabase
      .from("property_documents")
      .insert(documentRows);

    if (documentError) {
      throw new Error(
        `Could not insert documents for ${title}: ${documentError.message}`,
      );
    }
  }

  const featureRows = [
    {
      property_id: insertedProperty.id,
      label: "Project Type",
      value: cleanString(property.type) || null,
      icon: "building",
      position: 1,
      is_highlight: true,
    },
    {
      property_id: insertedProperty.id,
      label: "Original Property Type",
      value: cleanString(property.propertyType || property["Property Type"]) || null,
      icon: "home",
      position: 2,
      is_highlight: true,
    },
    {
      property_id: insertedProperty.id,
      label: "Location",
      value: cleanString(property.location) || null,
      icon: "map-pin",
      position: 3,
      is_highlight: false,
    },
  ].filter((feature) => feature.value);

  if (featureRows.length > 0) {
    const { error: featureError } = await supabase
      .from("property_features")
      .insert(featureRows);

    if (featureError) {
      throw new Error(
        `Could not insert features for ${title}: ${featureError.message}`,
      );
    }
  }

  console.log(
    `Done: ${title} | ${imageRows.length} images | ${videoRows.length} videos | ${documentRows.length} documents`,
  );
}

async function main() {
  const sourceFile = process.argv[2] || DEFAULT_SOURCE_FILE;

  console.log(`Using source file: ${sourceFile}`);
  console.log(`Using storage bucket: ${MEDIA_BUCKET}`);

  await ensureBucket(MEDIA_BUCKET);

  const properties = parseSourceFile(sourceFile);

  console.log(`Found ${properties.length} properties to import.`);

  for (let index = 0; index < properties.length; index += 1) {
    await importProperty(properties[index], index);
  }

  console.log("");
  console.log("Import completed successfully.");
}

main().catch((error) => {
  console.error("");
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});