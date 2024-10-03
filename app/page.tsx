import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return(
    <>
    <div className="flex flex-col">
      Home
      <Link className={buttonVariants()} href='/admin'>Go to my admin</Link>
    </div>
    </>
  );
}
