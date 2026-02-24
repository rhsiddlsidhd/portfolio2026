import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/atoms/carousel";

interface ChallengeImageCarouselProps {
  imgs: string[];
  challengeId: string;
  projectTitle:string;
}

export function ChallengeImageCarousel({
  imgs,
  challengeId,
  projectTitle
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
                <img
                  src={`/images/challenges/${projectTitle}/${img}`}
                  alt={`${challengeId} evidence ${i + 1}`}
                  className="w-full rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
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
      <div className="hidden grid-cols-2 gap-4 sm:grid">
        {imgs.map((img, i) => (
          <img
            key={i}
            src={`/images/challenges/${projectTitle}/${img}`}
            alt={`${challengeId} evidence ${i + 1}`}
            className="w-full rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ))}
      </div>
    </>
  );
}
