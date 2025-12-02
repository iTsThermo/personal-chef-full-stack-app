import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Error() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1 className="font-extrabold text-2xl">
        It seems like you are trying to access something that doesn't exit... ;(
      </h1>
      <Button className="w-3xs bg-foreground">
        <Link to={"/"}>Return to Home</Link>
      </Button>
    </div>
  );
}
