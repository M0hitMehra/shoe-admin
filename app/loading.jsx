import { Loader } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" flex justify-center items-center w-full h-full">
      <Loader className=" animate-spin  m-auto h-16 w-16" />
    </div>
  );
}
