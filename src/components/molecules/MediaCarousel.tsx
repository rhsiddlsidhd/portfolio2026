import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/atoms/carousel";
import { cn } from "@/lib/utils";

interface MediaCarouselProps {
  imgs: string[];
  basePath: string; // 예: `${imageBaseUrl}/challenges/${projectId}` 또는 `${imageBaseUrl}/ai`
  altPrefix: string;
  className?: string;
}

const isVideo = (filename: string) => filename.endsWith(".webm");

const MediaItem = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  if (isVideo(src)) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full rounded-lg"
      >
        <source src={src} type="video/webm" />
      </video>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full rounded-lg object-cover"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
};

/**
 * 이미지 또는 비디오 목록을 캐러셀(모바일) 또는 그리드(데스크탑) 형태로 보여주는 범용 컴포넌트입니다.
 */
export function MediaCarousel({
  imgs,
  basePath,
  altPrefix,
  className,
}: MediaCarouselProps) {
  if (imgs.length === 0) return null;

  return (
    <div className={className}>
      {/* Mobile: Carousel */}
      <div >
        <Carousel  opts={{ align: "start" }}>
          <CarouselContent className="">
            {imgs.map((img, i) => (
              <CarouselItem key={i} className="flex justify-center items-center">
                <MediaItem
                  src={`${basePath}/${img}`}
                  alt={`${altPrefix} media ${i + 1}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {imgs.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
      </div>

      {/* Desktop: Grid */}
      {/* sm:grid */}
      <div className={cn(`hidden grid-cols-2 gap-4 `, imgs.length === 1 && 'grid-cols-1')}>
        {imgs.map((img, i) => (
          <MediaItem
            key={i}
            src={`${basePath}/${img}`}
            alt={`${altPrefix} media ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
