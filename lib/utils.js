import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const server = "https://store-backend-0jpc.onrender.com/api/v1";
// export const server = "http://localhost:8080/api/v1"