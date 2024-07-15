import Image from "next/image";
import { MainDisplayControl } from "./_components/MainDisplayControl";

export default function Home() {
  return (
    <main >
      <div className="flex">
        <MainDisplayControl/> 
      </div>
    </main>
  );
}
