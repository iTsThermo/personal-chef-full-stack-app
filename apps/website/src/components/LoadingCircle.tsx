import { LoaderCircle } from "lucide-react";

export function LoadingCircle() {
  return (
    <div className="flex justify-center items-center">
      <svg className="mr-3 size-30 animate-spin" viewBox="0 0 24 24">
        <LoaderCircle />
      </svg>
    </div>
  );
}
