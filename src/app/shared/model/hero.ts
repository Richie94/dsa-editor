export interface Hero {
  id: number;
  name: string;
  description: string;
  species: string;
  culture: string;
  profession: string;
  sex: string;
  age: number | null;
  size: number | null;
  weight: number | null;
  eyeColor: string;
  hairColor: string;
  languages: string[],
  writings: string[],
  advantages: string[],
  disadvantages: string[],
  creator_id: number;
  hero_stats: HeroStats;
  notes: Evening[]
}

export interface HeroStats {
  mu: number;
  kl: number;
  in: number;
  ch: number;
  ff: number;
  ge: number;
  ko: number;
  kk: number;
}

export interface Evening {
  date: string;
  text: string;
  lep: number;
  kap: number;
  asp: number;
  sch: number;
}
