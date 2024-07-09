import React from 'react';
import { Loader as LoadingIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <LoadingIcon className="animate-spin m-auto h-48 w-48" />
    </div>
  );
}

export default Loader;
