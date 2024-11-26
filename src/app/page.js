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
import Link from "next/link";

const previousFestivalImages = [
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival1.jpg`, alt: "Previous Festival Image 1" },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival2.jpg`, alt: "Previous Festival Image 2" },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival3.jpg`, alt: "Previous Festival Image 3" },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival4.jpg`, alt: "Previous Festival Image 4" },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival5.jpg`, alt: "Previous Festival Image 5" },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival6.jpg`, alt: "Previous Festival Image 6" },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival7.jpg`, alt: "Previous Festival Image 7" },
  { src: `${process.env.NEXT_PUBLIC_BASE_PATH}/PreviousFestival8.jpg`, alt: "Previous Festival Image 8" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 overflow-x-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
            Previous Festival Fun!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Take a look at some photos from last year&apos;s festival below and get ready for another exciting year of fun and learning!
          </p>

          <Carousel
            className="w-full sm:w-3/4 lg:max-w-1/2 mx-auto relative"
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
              {previousFestivalImages.map((image, index) => (
                <CarouselItem key={index} className="relative flex-shrink-0 w-full h-[calc(100vw*3/4)] sm:h-[calc(75vw*3/4)] lg:h-[calc(50vw*3/4)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="mt-5 w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Meet our STEM Outreach Partners!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            The Annual Engineering and Science Festival would not be possible without the support of our community supporters.
            <br></br>
            Discover our sponsors and learn more about them by clicking the button below.
          </p>
          <Link href="https://www.boisestate.edu/coen-mssc-old/outreach-recruitment/engineering-and-science-festival-sponsors/">
            <button className="bg-bsu-blue text-white px-6 py-3 rounded hover:bg-orange-500 transition-colors">
              Learn more
            </button>
          </Link>
        </div>
      </section>

      <section className="mt-12 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
            Register for this year&apos;s Engineering and Science Festival!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Sign up to participate in this year&apos;s Engineering and Science Festival. Fill out the form below to get started!
          </p>
          <div className="w-full h-[100vh] sm:w-3/4 lg:max-w-1/2 mx-auto">
            <iframe
              src="https://app.smartsheet.com/b/form/b46202be87ce478ab9ff37ad1fb9c1a1"
              className="w-full h-[100vh] rounded-lg shadow-lg border-2 border-gray-300"
            />
          </div>
        </div>
      </section>
    </div>
  )
}