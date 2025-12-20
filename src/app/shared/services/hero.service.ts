import {EnvironmentInjector, Injectable, OnDestroy, runInInjectionContext} from '@angular/core';
import {Hero, HeroWrapper} from '../model/hero';
import {combineLatest, from, map, Observable, Subject, shareReplay, catchError, throwError, tap} from 'rxjs';
import {AuthService} from "./auth.service";
import {TalentService} from "./talent.service";
import {FightTechniqueService} from "./fight-technique.service";
import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    docData,
    Firestore,
    getDocs,
    collectionData,
    query,
    updateDoc,
    where,
} from '@angular/fire/firestore';

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
        public afs: Firestore,
        public injector: EnvironmentInjector
    ) {

    }

    ngOnDestroy(): void {}

    triggerSave() {
        this.saveSubscription.next("");
    }

    getHeroes(): Observable<HeroWrapper[]> {
        // Modern, easy-to-understand realtime version using collectionData and dedupe
        const uid = this.authService.readUser().uid;
        const heroesCol = collection(this.afs, 'heroes') as CollectionReference<Hero>;

        const myQ = query(heroesCol, where('creator_id', '==', uid));
        const pubQ = query(heroesCol, where('public', '==', true));

        const my$ = collectionData(myQ, { idField: 'id' }) as Observable<(Hero & { id: string })[]>;
        const pub$ = collectionData(pubQ, { idField: 'id' }) as Observable<(Hero & { id: string })[]>;

        return combineLatest([my$, pub$]).pipe(
            map(([a, b]) => {
                const out: HeroWrapper[] = [];
                const seen = new Set<string>();
                for (const d of [...a, ...b]) {
                    const { id, ...hero } = d as any;
                    if (!seen.has(id)) {
                        seen.add(id);
                        out.push({ id, hero: hero as Hero });
                    }
                }
                return out;
            })
        );
    }

    private heroesMap = new Map<string, Observable<HeroWrapper | null>>()

    getHero(id: string): Observable<HeroWrapper | null> {
        // Modern caching with shareReplay to avoid manual subscriptions
        const cached = this.heroesMap.get(id);
        if (cached) return cached;

        const stream$ = this.getHeroById(id).pipe(
            shareReplay({ bufferSize: 1, refCount: true })
        );
        this.heroesMap.set(id, stream$);
        return stream$;
    }

    private getHeroById(id: string): Observable<HeroWrapper | null> {
        // Wrap the document reference creation and modular call
        return runInInjectionContext(this.injector, () => {
            const heroDocRef = doc(this.afs, 'heroes', id);

            return docData(heroDocRef).pipe(
                map((data) => {
                    if (!data) return null;
                    const h = data as Hero;
                    if (h.public || h.creator_id === this.authService.userData!.uid) {
                        return {id, hero: h} as HeroWrapper;
                    }
                    return null;
                })
            );
        });
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

        const heroesCol = collection(this.afs, 'heroes') as CollectionReference<Hero>;
        return from(addDoc(heroesCol, hero).then((d) => {
            console.log("Created hero", hero.name)
            return {id: d.id, hero} as HeroWrapper;
        }))
    }


    updateHero(heroWrapper: HeroWrapper): Observable<void> {
        const heroDocRef = doc(this.afs, 'heroes', heroWrapper.id);
        return from(updateDoc(heroDocRef, heroWrapper.hero as any)).pipe(
            tap(() => console.log('Updated hero', heroWrapper.id)),
            catchError(err => {
                console.error('Failed to update hero', heroWrapper.id, err);
                return throwError(() => err);
            })
        );
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
