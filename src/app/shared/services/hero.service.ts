import {Injectable, OnDestroy} from '@angular/core';
import {Evening, FightTechnique, Hero, HeroWrapper, Talent} from '../model/hero';
import {combineLatest, from, map, Observable, of, Subject, Subscription} from 'rxjs';
import {AuthService} from "./auth.service";
import {TalentService} from "./talent.service";
import {FightTechniqueService} from "./fight-technique.service";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})
export class HeroService implements OnDestroy {

    private saveSubscription = new Subject<string>();
    shouldSave = this.saveSubscription.asObservable()

    constructor(
        private authService: AuthService,
        private talentService: TalentService,
        private fightTechniqueService: FightTechniqueService,
        public afs: AngularFirestore
    ) {

    }

    ngOnDestroy(): void {
    }

    triggerSave() {
        this.saveSubscription.next("");
    }

    getHeroes(): Observable<HeroWrapper[]> {
        // query by creator_id and whether hero is public
        let uid = this.authService.readUser().uid;
        let myHeroesObservable = from(this.afs.collection<Hero>('heroes')
            .ref
            .where("creator_id", "==", uid)
            .get());
        let publicHeroesObservable = from(this.afs.collection<Hero>('heroes')
            .ref
            .where("public", "==", true)
            .get());

        return combineLatest([myHeroesObservable, publicHeroesObservable])
            .pipe(
                map(([myHeroes, publicHeroes]) => {
                    let heroes: HeroWrapper[] = []
                    let ids = new Set<string>()
                    myHeroes.forEach((doc) => {
                        let h = doc.data() as Hero
                        ids.add(doc.id)
                        heroes.push({
                            id: doc.id, hero: h
                        })
                    })
                    publicHeroes.forEach((doc) => {
                        let h = doc.data() as Hero
                        if (!ids.has(doc.id)) {
                            ids.add(doc.id)
                            heroes.push({
                                id: doc.id, hero: h
                            })
                        }
                    })
                    return heroes
                })
            )
    }

    private heroesMap = new Map<string, Observable<HeroWrapper | null>>()

    getHero(id: string): Observable<HeroWrapper | null> {
        // check if we already have a subscription for this id
        if (this.heroesMap.has(id)) {
            return this.heroesMap.get(id)!
        } else {
            console.log("Create new subscription for " + id)
            // create a new subscription
            let obs = this.getHeroById(id)
            this.heroesMap.set(id, obs)
            return obs
        }
    }

    private getHeroById(id: string): Observable<HeroWrapper | null> {
        return this.afs.collection<Hero>('heroes').doc(id)
            .snapshotChanges()
            .pipe(map((d) => {
                console.log("Request Hero: " + d.payload.id)
                console.log(d.type)
                let h = d.payload.data() as Hero
                // filter it if either it is not public or the creator_id is not the same as the userId
                if (h.public || h.creator_id == this.authService.userData!.uid) {
                    return {
                        id: d.payload.id,
                        hero: h
                    }
                } else {
                    return null
                }
            }))
    }

    createHero(name: string): Observable<HeroWrapper> {
        console.log("Create hero " + name)
        let hero = {
            ap: 1000,
            name: name,
            description: "",
            species: "",
            culture: "",
            profession: "",
            eyeColor: "",
            hairColor: "",
            sex: "",
            le: 20,
            gs: 8,
            ini: 10,
            sk: 1,
            zk: 1,
            aw: 8,
            age: null,
            public: false,
            size: null,
            weight: null,
            languages: [],
            writings: [],
            advantages: [],
            disadvantages: [],
            creator_id: this.authService.userData!.uid,
            hero_stats: {mu: 8, kl: 8, in: 8, ch: 8, ge: 8, ff: 8, kk: 8, ko: 8},
            notes: [],
            weapons: [],
            armor: [],
            shield: [],
            special_abilities: [],
            special_fight_abilities: [],
            fight_techniques: this.fightTechniqueService.initFightTechniques(),
            talents: this.talentService.initTalents(),
            items: [],
            liturgic_spells: [],
            magic_spells: [],
            wallet: {
                dukaten: 0,
                silbertaler: 0,
                heller: 0,
                kreuzer: 0
            },
        };

        return from(this.afs.collection<Hero>('heroes')
            .add(hero)
            .then((d) => {
                console.log("Created hero", hero.name)
                return {
                    id: d.id,
                    hero: hero
                }
            }))
    }


    updateHero(heroWrapper: HeroWrapper) {
        this.afs.collection('heroes')
            .doc(heroWrapper.id)
            .update(heroWrapper.hero)
            .then(() => console.log("Updated hero " + heroWrapper.id))
    }

    HEROES: Hero[] = [
        {
            public: true,
            ap: 1520,
            name: "Hammer Harald",
            species: "Mensch",
            culture: "Nordland",
            profession: "Krieger",
            eyeColor: "blau",
            hairColor: "braun",
            sex: "männlich",
            languages: ["Nordisch"],
            writings: ["Nordisch"],
            advantages: ["Gewandtheit", "Schlitzohr", "Schönheit"],
            disadvantages: ["Fett", "Dumm"],
            age: 30,
            size: 180,
            weight: 80,
            le: 20,
            gs: 8,
            ini: 10,
            sk: 1,
            zk: 1,
            aw: 8,
            description: "Treuer Held",
            creator_id: "1pyqGYvGbDVzq21rTZ016RZiUgp2",
            hero_stats: {
                mu: 14,
                kl: 10,
                in: 13,
                ch: 10,
                ff: 13,
                ge: 13,
                ko: 15,
                kk: 17
            },
            weapons: [
                {
                    name: "Hammer",
                    technique: "Hiebwaffen",
                    tp: "1W6+1",
                    reach: "kurz",
                    at: 16,
                    pa: 10,
                    barrier: "KK 10"
                }, {
                    name: "Axt",
                    technique: "Hiebwaffen",
                    tp: "1W6+1",
                    reach: "kurz",
                    at: 16,
                    pa: 10,
                    barrier: "KK 10"
                }],
            armor: [
                {
                    name: "Lederpanzer",
                    rs: 2,
                    be: 1,
                    mod: ""
                }
            ],
            shield: [
                {
                    name: "Schild",
                    sp: 22,
                    at: 12,
                    pa: 12
                }
            ],
            special_abilities: ["Athlet"],
            special_fight_abilities: ["Tritt in die Eier"],
            fight_techniques: this.fightTechniqueService.initFightTechniques(),
            talents: this.talentService.initTalents(),
            items: [
                {
                    name: "Brot",
                    amount: 2,
                    weight: 1.24,
                    price: 1
                }
            ],
            wallet: {
                dukaten: 10,
                silbertaler: 10,
                heller: 10,
                kreuzer: 10
            },
            notes: [
                {
                    text: "Wir lagen vor Madagaskar.",
                    date: "10.1.2023",
                    lep: 35,
                    asp: 0,
                    kap: 0,
                    sch: 3
                },
                {
                    text: "Und gestorben.",
                    date: "22.12.2022",
                    lep: 27,
                    asp: 0,
                    kap: 0,
                    sch: 3
                }
            ],
            liturgic_spells: [
                {
                    name: "Ablativum",
                    probe: "MU/KL/CH",
                    target: "selbst",
                    sf: "D",
                    spell_duration: "1",
                    cost: "1",
                    cast_duration: "2",
                    range: "selbst",
                },
                {
                    name: "Ablativum",
                    probe: "MU/KL/CH",
                    target: "selbst",
                    sf: "D",
                    spell_duration: "1",
                    cost: "1",
                    cast_duration: "2",
                    range: "selbst",
                }
            ],
            magic_spells: [
                {
                    name: "Ablativum",
                    probe: "MU/KL/CH",
                    target: "selbst",
                    sf: "D",
                    spell_duration: "1",
                    cost: "1",
                    cast_duration: "2",
                    range: "selbst",
                },
                {
                    name: "Ablativum",
                    probe: "MU/KL/CH",
                    target: "selbst",
                    sf: "D",
                    spell_duration: "1",
                    cost: "1",
                    cast_duration: "2",
                    range: "selbst",
                }
            ]
        },
        {
            le: 20,
            public: true,
            gs: 8,
            ini: 10,
            sk: 1,
            zk: 1,
            aw: 8,
            name: "Berta",
            ap: 1200,
            description: "dicke Tante",
            creator_id: "1",
            species: "Mensch",
            culture: "Nordland",
            profession: "Krieger",
            eyeColor: "blau",
            hairColor: "braun",
            sex: "männlich",
            languages: ["Nordisch"],
            writings: ["Nordisch"],
            advantages: ["Gewandtheit"],
            disadvantages: ["Fett"],
            age: 30,
            weight: 80,
            size: 180,
            hero_stats: {
                mu: 14,
                kl: 10,
                in: 13,
                ch: 10,
                ff: 13,
                ge: 13,
                ko: 15,
                kk: 17
            },
            notes: [],
            liturgic_spells: [],
            magic_spells: [],
            weapons: [
                {
                    name: "Hammer",
                    technique: "Hiebwaffen",
                    tp: "1W6+1",
                    reach: "kurz",
                    at: 16,
                    pa: 10,
                    barrier: "KK 10"
                }],
            armor: [],
            shield: [],
            special_abilities: [],
            special_fight_abilities: [],
            fight_techniques: this.fightTechniqueService.initFightTechniques(),
            talents: this.talentService.initTalents(),
            items: [],
            wallet: {
                dukaten: 10,
                silbertaler: 10,
                heller: 10,
                kreuzer: 10
            },
        },
        {
            le: 20,
            public: true,
            gs: 8,
            ini: 10,
            sk: 1,
            zk: 1,
            aw: 8,
            ap: 1100,
            name: "Grimelda",
            description: "Alte Frau",
            species: "Mensch",
            culture: "Nordland",
            profession: "Krieger",
            eyeColor: "blau",
            hairColor: "braun",
            sex: "männlich",
            languages: ["Nordisch"],
            writings: ["Nordisch"],
            advantages: ["Gewandtheit"],
            disadvantages: ["Fett"],
            age: 30,
            size: 180,
            weight: 80,
            creator_id: "1",
            hero_stats: {
                mu: 14,
                kl: 10,
                in: 13,
                ch: 10,
                ff: 13,
                ge: 13,
                ko: 15,
                kk: 17
            },
            liturgic_spells: [],
            magic_spells: [],
            notes: [],
            weapons: [
                {
                    name: "Hammer",
                    technique: "Hiebwaffen",
                    tp: "1W6+1",
                    reach: "kurz",
                    at: 16,
                    pa: 10,
                    barrier: "KK 10"
                }],
            armor: [],
            shield: [],
            special_abilities: [],
            special_fight_abilities: [],
            fight_techniques: this.fightTechniqueService.initFightTechniques(),
            talents: this.talentService.initTalents(),
            items: [],
            wallet: {
                dukaten: 10,
                silbertaler: 10,
                heller: 10,
                kreuzer: 10
            },
        }
    ]
}
