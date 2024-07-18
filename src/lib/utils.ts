import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setVariant(variants: { [key: string]: string }, key?: string) {
  if (key && key in variants) {
    return variants[key];
  }

  return variants[Object.keys(variants)[0]];
}
