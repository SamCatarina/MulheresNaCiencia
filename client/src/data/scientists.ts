import { Scientist } from "@/components/scientists-modal";
import scientistsJson from "./scientists.json";
import scientist01 from "./images/scientist01.png";
import scientist02 from "./images/scientist02.png";
import scientist03 from "./images/scientist03.png";
import scientist04 from "./images/scientist04.png";


const imageMap: Record<string, string> = {
  "scientist01.png": scientist01,
  "scientist02.png": scientist02,
  "scientist03.png": scientist03,
  "scientist04.png": scientist04,
};

export const allScientists: Scientist[] = (scientistsJson as Scientist[]).map(
  (s) => ({
    ...s,
    image: imageMap[s.image] || s.image,
  })
);

export const getAllResearchThemes = (): string[] => {
  const themes = new Set<string>();
  allScientists.forEach((scientist) => {
    scientist.researchThemes?.forEach((theme) => themes.add(theme));
  });
  return Array.from(themes).sort();
};
