import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const catigory: string[] = [
  "Appetizers",
  "Salads",
  "Pizzas",
  "Lunch favorites",
  "Main dishes",
  "Fish & Sea foods",
  "Side dish",
  "Brunch",
  "Desserts",
  "salads",
];
export const Categories = () => {
  return (
    <div className="flex  flex-col gap-10 pt-8 pb-8 p-22 ">
      <p className="text-[#FFFFFF] font-bold text-xl">Categories</p>

      <div className="pl-11 pr-11">
        <Carousel>
          <CarouselContent className="flex flex-row gap-2">
            {catigory.map((item, indx) => {
              return (
                <CarouselItem key={indx} className="basis-1/8 text-nowrap">
                  <button
                    className="pt-2 pb-2 p-5 rounded-full bg-white text-black text-sm"
                    key={indx}
                  >
                    {item}
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
