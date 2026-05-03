import type { ImgHTMLAttributes } from "react";

const base = import.meta.env.BASE_URL;

interface PictureProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Source path relative to /public, without extension (e.g. "hero-bg"). */
  name: string;
  /** Image width in CSS px (used for the rendered <img>'s width attr). */
  width?: number;
  /** Image height in CSS px. */
  height?: number;
  /** When true, sets fetchpriority="high" + loading="eager". */
  priority?: boolean;
  pictureClassName?: string;
}

/**
 * Modern <picture> wrapper that serves AVIF, then WebP, then PNG.
 * The .webp / .avif siblings must exist alongside the .png in /public.
 */
export function Picture({
  name,
  alt,
  width,
  height,
  priority,
  pictureClassName,
  className,
  ...rest
}: PictureProps) {
  const png = `${base}${name}.png`;
  const webp = `${base}${name}.webp`;
  const avif = `${base}${name}.avif`;

  return (
    <picture className={pictureClassName}>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img
        src={png}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // React 19 supports fetchPriority natively; older types may not.
        {...({ fetchPriority: priority ? "high" : "auto" } as Record<string, string>)}
        className={className}
        {...rest}
      />
    </picture>
  );
}
