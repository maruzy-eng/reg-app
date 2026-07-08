export const LP_ASSETS_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/lp-assets";

export const LP_LOGO_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/lp-assets/logos/checkmate-logo-color.jpg";

export const LP_FLIP_HOUSE_IMAGE_NUMBERS = [
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
] as const;

export type LpFlipHouseImageNumber =
  (typeof LP_FLIP_HOUSE_IMAGE_NUMBERS)[number];

export function getFlipHouseImageUrl(imageNumber: LpFlipHouseImageNumber) {
  return `${LP_ASSETS_URL}/lp/flip-house/${imageNumber}.png`;
}

export const LP_FLIP_HOUSE_IMAGES = {
  image17: getFlipHouseImageUrl("17"),
  image18: getFlipHouseImageUrl("18"),
  image19: getFlipHouseImageUrl("19"),
  image20: getFlipHouseImageUrl("20"),
  image21: getFlipHouseImageUrl("21"),
  image22: getFlipHouseImageUrl("22"),
  image23: getFlipHouseImageUrl("23"),
  image24: getFlipHouseImageUrl("24"),
  image25: getFlipHouseImageUrl("25"),
  image26: getFlipHouseImageUrl("26"),
  image27: getFlipHouseImageUrl("27"),
  image28: getFlipHouseImageUrl("28"),
  image29: getFlipHouseImageUrl("29"),
  image30: getFlipHouseImageUrl("30"),
  image31: getFlipHouseImageUrl("31"),
  image32: getFlipHouseImageUrl("32"),
};

export const LP_VIDEO_THUMBS = {
  rvdnzjzm7qa: `${LP_ASSETS_URL}/lp/videos/youtube-rvdnzjzm7qa.jpg`,
  oneB3rs5mr7e: `${LP_ASSETS_URL}/lp/videos/youtube-1b3rs5mr7-e.jpg`,
  onyo9rseov8: `${LP_ASSETS_URL}/lp/videos/youtube-onyo9rseov8.jpg`,
};

export const LP_EXTERNAL_VIDEO_LINKS = {
  rvdnzjzm7qa: "https://youtu.be/RvdnzJzm7QA?si=RkP7I59RaFzCnij2",
  oneB3rs5mr7e: "https://youtu.be/1B3Rs5mR7-E?si=O1a_k_wgUfLOtGDL",
  onyo9rseov8: "https://youtu.be/Onyo9rSEoV8?si=LKdstDszvyw-hMwu",
};

export const LP_ASSET_URL_MAP = {
  "https://checkmateproperty.com/wp-content/uploads/2023/04/checkmate-logo-color.jpg":
    LP_LOGO_URL,

  "http://checkmateproperty.com/wp-content/uploads/2026/05/17.png":
    LP_FLIP_HOUSE_IMAGES.image17,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/18.png":
    LP_FLIP_HOUSE_IMAGES.image18,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/19.png":
    LP_FLIP_HOUSE_IMAGES.image19,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/20.png":
    LP_FLIP_HOUSE_IMAGES.image20,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/21.png":
    LP_FLIP_HOUSE_IMAGES.image21,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/22.png":
    LP_FLIP_HOUSE_IMAGES.image22,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/23.png":
    LP_FLIP_HOUSE_IMAGES.image23,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/24.png":
    LP_FLIP_HOUSE_IMAGES.image24,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/25.png":
    LP_FLIP_HOUSE_IMAGES.image25,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/26.png":
    LP_FLIP_HOUSE_IMAGES.image26,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/27.png":
    LP_FLIP_HOUSE_IMAGES.image27,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/28.png":
    LP_FLIP_HOUSE_IMAGES.image28,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/29.png":
    LP_FLIP_HOUSE_IMAGES.image29,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/30.png":
    LP_FLIP_HOUSE_IMAGES.image30,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/31.png":
    LP_FLIP_HOUSE_IMAGES.image31,
  "http://checkmateproperty.com/wp-content/uploads/2026/05/32.png":
    LP_FLIP_HOUSE_IMAGES.image32,

  "https://img.youtube.com/vi/RvdnzJzm7QA/hqdefault.jpg":
    LP_VIDEO_THUMBS.rvdnzjzm7qa,
  "https://img.youtube.com/vi/1B3Rs5mR7-E/hqdefault.jpg":
    LP_VIDEO_THUMBS.oneB3rs5mr7e,
  "https://img.youtube.com/vi/Onyo9rSEoV8/hqdefault.jpg":
    LP_VIDEO_THUMBS.onyo9rseov8,
};