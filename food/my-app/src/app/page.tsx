import { Categories } from "./_components/Categories";
import { UserProvider } from "./sign-up/_components/userValueProvider";

export default function Home() {
  return (
    <div className="  flex flex-col bg-[#404040]">
      <div className="h-142">
        <img className="object-fit" src="/BG.png"></img>
      </div>
      <Categories />
    </div>
  );
}
