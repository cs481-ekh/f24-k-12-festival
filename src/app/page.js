"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        Welcome to the Engineering and Science Festival!
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
        Join us for an exciting journey through science, technology, engineering, and math.
      </p>
      <div className="w-full sm:w-3/4 lg:max-w-1/2">
        <video
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/StemFestival.mp4`}
          controls
          className="w-full h-auto rounded-lg shadow-lg"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <section className="mt-12 w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Previous Festival Fun!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Take a look at some photos from last year's festival below and get ready for another exciting year of fun and learning!
          </p>

          <Carousel
            className="w-full sm:w-3/4 lg:w-3/4 xl:w-1/2 mx-auto relative"
            opts={{
              align: "center",
              loop: true,
              arrows: true,
              watchResize: true,
              containScroll: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent className="flex gap-4">
              <CarouselItem className="relative flex-shrink-0 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival1.jpg`}
                  alt="Previous Festival Image 1"
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="relative flex-shrink-0 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival2.jpg`}
                  alt="Previous Festival Image 2"
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="relative flex-shrink-0 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival3.jpg`}
                  alt="Previous Festival Image 3"
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="relative flex-shrink-0 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival4.jpg`}
                  alt="Previous Festival Image 4"
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="relative flex-shrink-0 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival5.jpg`}
                  alt="Previous Festival Image 5"
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="relative flex-shrink-0 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival6.jpg`}
                  alt="Previous Festival Image 6"
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="relative flex-shrink-0 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival7.jpg`}
                  alt="Previous Festival Image 7"
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="relative flex-shrink-0 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival8.jpg`}
                  alt="Previous Festival Image 8"
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
