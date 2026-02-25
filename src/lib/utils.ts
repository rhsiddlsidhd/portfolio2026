import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { imageBaseUrl } from "@/constants/path";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ThumbnailSrc = {
  webp: string;
  default: string;
};

/**
 * 프로젝트 썸네일 경로를 생성하는 함수
 * @param id 프로젝트 ID (폴더명 및 파일명 prefix로 사용됨)
 * @returns webp srcset 및 default src를 포함한 객체
 */
export const createProjectThumbnailSrc = (id: string): ThumbnailSrc => {
  const THUMBNAIL_WIDTHS = [1280, 960, 640, 320] as const;

  const webpSrcSet = THUMBNAIL_WIDTHS.map(
    (w) => `${imageBaseUrl}/projects/${id}/${id}_${w}w.webp ${w}w`,
  ).join(", ");

  return {
    webp: webpSrcSet,
    default: `${imageBaseUrl}/projects/${id}/${id}_1280w.webp`,
  };
};
