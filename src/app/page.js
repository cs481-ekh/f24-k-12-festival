import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

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
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
            Previous Festival Fun!
          </h2>

          <Carousel
            className="w-full sm:w-3/4 lg:w-3/4 xl:w-1/2 mx-auto"
            opts={{
              align: "start",
              loop: true,
              watchResize: true,
              containScroll: true,
            }}
          >
            <CarouselContent>
              <CarouselItem className="">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival1.jpg`}
                  alt="Festival 1"
                  width={640}
                  height={256}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival2.jpg`}
                  alt="Festival 2"
                  width={640}
                  height={256}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem className="">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival3.jpg`}
                  alt="Festival 3"
                  width={640}
                  height={256}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-gray-800 bg-opacity-50 p-2 rounded-full"/>
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-gray-800 bg-opacity-50 p-2 rounded-full"/>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
