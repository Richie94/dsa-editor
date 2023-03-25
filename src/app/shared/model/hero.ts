export interface Hero {
  id: number;
  ap: number;

  public: boolean;
  le: number;
  sk: number;
  zk: number;
  aw: number;
  ini: number;
  gs: number;
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
  creator_id: string;
  hero_stats: HeroStats;
  notes: Evening[],
  wallet: Wallet,
  items: Item[],
  talents: Talent[],
  special_abilities: string[],
  special_fight_abilities: string[],
  fight_techniques: FightTechnique[],
  weapons: Weapon[],
  armor: Armor[],
  shield: Shield[],
  magic_spells: Spell[],
  liturgic_spells: Spell[],
}

export interface Spell {
  name: string;
  probe: string;
  spell_duration: string;
  cast_duration: string;
  range: string;
  target: string;
  sf: string;
  cost: string;

}

export interface Weapon {
  name: string;
  technique: string;
  tp: string;
  at: number;
  pa: number;
  reach: string;
  barrier: string;
}

export interface Armor {
  name: string;
  rs: number;
  be: number;
  mod: string;
}

export interface Shield {
  name: string;
  sp: number;
  at: number;
  pa: number;
}

export interface FightTechnique {
  name: string;
  ktw: number;
  at: number;
  pa: number;
}

export interface Wallet {
  dukaten: number;
  silbertaler: number;
  kreuzer: number;
  heller: number;
}

export interface Talent {
  name: string;
  value: number;
  probe: string;
  sf: string;
}

export interface Item {
  name: string;
  amount: number;
  weight: number;
  price: number;
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
