"use client";

import { useMemo, useState } from "react";
import styles from "./youtube-video-cover.module.css";

type YouTubeVideoCoverProps = {
  youtubeId: string;
  title: string;
  phrase: string;
  compact?: boolean;
  priority?: boolean;
};

export function YouTubeVideoCover({
  youtubeId,
  title,
  phrase,
  compact = false,
  priority = false,
}: YouTubeVideoCoverProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailQuality, setThumbnailQuality] = useState<
    "maxresdefault" | "hqdefault"
  >("maxresdefault");

  const embedUrl = useMemo(() => {
    const url = new URL(`https://www.youtube-nocookie.com/embed/${youtubeId}`);

    url.searchParams.set("autoplay", "1");
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("playsinline", "1");
    url.searchParams.set("iv_load_policy", "3");

    return url.toString();
  }, [youtubeId]);

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/${thumbnailQuality}.jpg`;

  if (isPlaying) {
    return (
      <div className={styles.player}>
        <iframe
          src={embedUrl}
          title={title}
          loading={priority ? "eager" : "lazy"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={styles.iframe}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.cover} ${compact ? styles.compact : ""}`}
      onClick={() => setIsPlaying(true)}
      aria-label={`Reproduzir vídeo: ${title}`}
    >
      <img
        src={thumbnailUrl}
        alt=""
        aria-hidden="true"
        className={styles.thumbnail}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setThumbnailQuality("hqdefault")}
      />

      <span className={styles.overlay} aria-hidden="true" />

      <span className={styles.brand}>
        <span className={styles.brandDot} aria-hidden="true" />
        Checkmate Property
      </span>

      <span className={styles.phrase}>{phrase}</span>

      <span className={styles.playButton} aria-hidden="true">
        <span className={styles.playIcon}>▶</span>
      </span>
    </button>
  );
}