import React from 'react';
import { Loader as LoadingIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <LoadingIcon className="animate-spin m-auto h-16 w-16" />
    </div>
  );
}

export default Loader;
