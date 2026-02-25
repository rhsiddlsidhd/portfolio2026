import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/atoms/carousel";
import { imageBaseUrl } from "@/constants/path";
import { cn } from "@/lib/utils";

interface ChallengeImageCarouselProps {
  imgs: string[];
  challengeId: string;
  projectId: string;
}

const isVideo = (filename: string) => filename.endsWith(".webm");

const ChallengeMedia = ({
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

export function ChallengeImageCarousel({
  imgs,
  challengeId,
  projectId,
}: ChallengeImageCarouselProps) {
  if (imgs.length === 0) return null;

  return (
    <>
      {/* Mobile: Carousel */}
      <div className="sm:hidden">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {imgs.map((img, i) => (
              <CarouselItem key={i}>
                <ChallengeMedia
                  src={`${imageBaseUrl}/challenges/${projectId}/${img}`}
                  alt={`${challengeId} evidence ${i + 1}`}
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

      {/* Desktop: grid */}
      <div className={cn(`hidden grid-cols-2 gap-4 sm:grid`, imgs.length === 1 && 'grid-cols-1')}>
        {imgs.map((img, i) => (
          <ChallengeMedia
            key={i}
            src={`${imageBaseUrl}/challenges/${projectId}/${img}`}
            alt={`${challengeId} evidence ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
