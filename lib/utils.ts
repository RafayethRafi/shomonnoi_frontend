import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanMarkdownContent(content: string) {
  return content
    .replace(/#+\s/g, "")
    .replace(/\*\*|\*|_/g, "")
    .replace(/(?:\*|-|\d\.)\s/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/```([\s\S]*?)```/g, "")
    .replace(/> /g, "")
    .replace(/\|/g, "")
    .replace(/\s+-+\s+/g, "\n")
    .replace(/^\s+|\s+$/g, "");
}
