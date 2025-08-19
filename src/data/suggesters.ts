import suggestersJson from "./suggesters.json";

export interface Suggester {
    name: string
}

export const allSuggester: Suggester[] = (suggestersJson as Suggester[]).map(
  (s) => (
    s
  )
);