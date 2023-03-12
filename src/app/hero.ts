export interface Hero {
    id: number;
    name: string;
    creator_id: number;
    hero_stats: HeroStats;
  }

export interface HeroStats {
    mu : Number;
    kl : Number;
    in : Number;
    ch : Number;
    ff : Number;
    ge : Number;
    ko : Number;
    kk : Number;
}

export interface Evening {
    id: number;
    hero_id: number;
    date: Date;
    text: string;
    lep: number;
    kap: number;
    asp: number;
    sch: number;
}
