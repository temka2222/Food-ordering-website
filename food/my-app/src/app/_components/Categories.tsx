import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const category: string[] = [
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
    <div className="flex  flex-col gap-10 pt-4 pb-4 ">
      <p className="text-[#FFFFFF] font-bold text-xl">Categories</p>

      <div className="pl-11 pr-11">
        <Carousel>
          <CarouselContent className="flex flex-row gap-4">
            {category.map((item, indx) => (
              <CarouselItem key={indx} className="basis-auto">
                <button className="px-5 py-2 rounded-full bg-white text-black text-sm whitespace-nowrap">
                  {item}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-transparent border-0 text-white" />
          <CarouselNext className="bg-transparent border-0 text-white" />
        </Carousel>
      </div>
    </div>
  );
};
