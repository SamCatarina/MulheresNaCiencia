import { Scientist } from "../components/scientists-modal";
import scientistsJson from "./scientists.json";
import profile01 from "./images/profile01.png";
import profile02 from "./images/profile02.png";
import profile03 from "./images/profile03.png";


const imageMap: Record<string, string> = {
  "profile01.png": profile01,
  "profile02.png": profile02,
  "profile03.png": profile03,
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
