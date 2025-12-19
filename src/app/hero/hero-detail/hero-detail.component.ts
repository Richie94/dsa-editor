import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../shared/services/hero.service';
import {AbstractHeroComponent} from "../abstract-hero-component";
import {AuthService} from "../../shared/services/auth.service";
import {Talent} from "../../shared/model/hero";


@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent extends AbstractHeroComponent {

    constructor(
        route: ActivatedRoute,
        heroService: HeroService,
        authService: AuthService,
    ) {
        super(route, authService, heroService);
    }

    attributeColumns: string[] = ['name', 'probe', 'fw'];

    private bodyTalents: string[] = [
        "Fliegen",
        "Gaukeleien",
        "Klettern",
        "Körperbeherrschung",
        "Kraftakt",
        "Reiten",
        "Schwimmen",
        "Selbstbeherrschung",
        "Singen",
        "Sinnesschärfe",
        "Tanzen",
        "Taschendiebstahl",
        "Verbergen",
        "Zechen"
    ]

    private socialTalents: string[] = [
        "Bekehren & Überzeugen",
        "Betören",
        "Einschüchtern",
        "Etikette",
        "Gassenwissen",
        "Menschenkenntnis",
        "Überreden",
        "Verkleiden",
        "Willenskraft",
        ]

    private natureTalents: string[] = [
        "Fährtensuchen",
        "Fesseln",
        "Fischen & Angeln",
        "Orientierung",
        "Pflanzenkunde",
        "Tierkunde",
        "Wildnisleben",
        ]

    private knowledgeTalents: string[] = [
        "Brett- & Glückspiel",
        "Geographie",
        "Geschichtswissen",
        "Götter & Kulte",
        "Kriegskunst",
        "Magiekunde",
        "Mechanik",
        "Rechnen",
        "Rechtskunde",
        "Sagen & Legenden",
        "Sphärenkunde",
        "Sternkunde",
        ]

    private craftTalents: string[] = [
        "Alchimie",
        "Boote & Schiffe",
        "Fahrzeuge",
        "Handel",
        "Heilkunde Gift",
        "Heilkunde Krankheiten",
        "Heilkunde Seele",
        "Heilkunde Wunden",
        "Holzbearbeitung",
        "Lebensmittelbearbeitung",
        "Lederbearbeitung",
        "Malen & Zeichnen",
        "Metallbearbeitung",
        "Musizieren",
        "Schlösserknacken",
        "Steinbearbeitung",
        "Stoffbearbeitung",
        ]

    getBodyTalents(): Talent[] {
        return this.hero?.talents?.filter(t => this.bodyTalents.includes(t.name)) || []
    }

    getSocialTalents(): Talent[] {
        return this.hero?.talents?.filter(t => this.socialTalents.includes(t.name)) || []
    }

    getNatureTalents(): Talent[] {
        return this.hero?.talents?.filter(t => this.natureTalents.includes(t.name)) || []
    }

    getKnowledgeTalents(): Talent[] {
        return this.hero?.talents?.filter(t => this.knowledgeTalents.includes(t.name)) || []
    }

    getCraftTalents(): Talent[] {
        return this.hero?.talents?.filter(t => this.craftTalents.includes(t.name)) || []
    }

    newSpecialAbility() {
        if (this.hero && !this.readOnly()) {
            this.hero.special_abilities.push("")
        }
    }

    removeSpecialAbility(index: number) {
        if (this.hero && !this.readOnly()) {
            this.hero.special_abilities.splice(index, 1)
        }
    }

    // --- QS Wahrscheinlichkeiten ---
    private qsCache: Map<string, number[]> = new Map<string, number[]>();

    private parseProbeCodes(probe: string): string[] {
        return (probe || '')
            .split('/')
            .map(p => p.trim().toUpperCase())
            .filter(p => !!p);
    }

    private getAttrValueByCode(code: string): number {
        const stats = this.hero?.hero_stats;
        if (!stats) return 0;
        switch (code) {
            case 'MU':
                return stats.mu;
            case 'KL':
                return stats.kl;
            case 'IN':
                return stats.in;
            case 'CH':
                return stats.ch;
            case 'FF':
                return stats.ff;
            case 'GE':
                return stats.ge;
            case 'KO':
                return stats.ko;
            case 'KK':
                return stats.kk;
            default:
                return 0;
        }
    }

    private fpToQs(fp: number): number {
        // 0 FP zählt als 1 FP (QS1)
        const effFp = Math.max(1, fp);
        if (effFp >= 16) return 6;
        if (effFp >= 13) return 5;
        if (effFp >= 10) return 4;
        if (effFp >= 7) return 3;
        if (effFp >= 4) return 2;
        return 1; // 1-3
    }

    private calcQsDistributionFor(talent: Talent): number[] {
        const codes = this.parseProbeCodes(talent.probe);
        if (codes.length !== 3 || !this.hero) return [0, 0, 0, 0, 0, 0];
        const a = this.getAttrValueByCode(codes[0]);
        const b = this.getAttrValueByCode(codes[1]);
        const c = this.getAttrValueByCode(codes[2]);
        const fw = talent.value || 0;

        // Schlüssel für Cache
        const key = `${a}-${b}-${c}-${fw}`;
        const cached = this.qsCache.get(key);
        if (cached) return cached;

        // Schnellere Berechnung über Faltungs-Ansatz (keine 8000er Enumeration)
        // Verteilungszähler für Defizit d = max(0, W20 - attr) pro Attribut
        const dist = (attr: number): number[] => {
            const len = Math.max(0, 20 - attr) + 1; // d in [0..20-attr]
            const arr = new Array(len).fill(0);
            if (len <= 0) return arr;
            // d=0 tritt für attr Ergebnisse auf (1..attr)
            arr[0] = Math.max(0, Math.min(20, attr));
            // d>=1 jeweils genau 1 Ergebnis (attr+d)
            for (let d = 1; d < len; d++) arr[d] = 1;
            return arr;
        }

        const convolve = (x: number[], y: number[]): number[] => {
            const out = new Array(x.length + y.length - 1).fill(0);
            for (let i = 0; i < x.length; i++) {
                const xi = x[i];
                if (xi === 0) continue;
                for (let j = 0; j < y.length; j++) {
                    const yj = y[j];
                    if (yj === 0) continue;
                    out[i + j] += xi * yj;
                }
            }
            return out;
        }

        const dA = dist(a);
        const dB = dist(b);
        const dC = dist(c);
        const sumAB = convolve(dA, dB);
        const sumABC = convolve(sumAB, dC); // Verteilung der Summe der Defizite

        // Zusatz: Verteilungen für Sonderfälle (kritische Ergebnisse)
        // o(attr): Punktmasse für Wurf=1 -> Defizit 0
        const oneDist = (): number[] => [1];
        // t(attr): Punktmasse für Wurf=20 -> Defizit d20 = max(0, 20-attr)
        const twentyDist = (attr: number): number[] => {
            const d20 = Math.max(0, 20 - attr);
            const arr = new Array(d20 + 1).fill(0);
            arr[d20] = 1;
            return arr;
        };

        // Elementweise Array-Operationen (Hilfsfunktionen)
        const addArrays = (x: number[], y: number[]): number[] => {
            const len = Math.max(x.length, y.length);
            const out = new Array(len).fill(0);
            for (let i = 0; i < len; i++) {
                const xi = i < x.length ? x[i] : 0;
                const yi = i < y.length ? y[i] : 0;
                out[i] = xi + yi;
            }
            return out;
        };
        const subArrays = (x: number[], y: number[]): number[] => {
            const len = Math.max(x.length, y.length);
            const out = new Array(len).fill(0);
            for (let i = 0; i < len; i++) {
                const xi = i < x.length ? x[i] : 0;
                const yi = i < y.length ? y[i] : 0;
                out[i] = xi - yi;
            }
            return out;
        };
        const scaleArray = (x: number[], k: number): number[] => x.map(v => v * k);

        const oA = oneDist();
        const oB = oneDist();
        const oC = oneDist();
        const tA = twentyDist(a);
        const tB = twentyDist(b);
        const tC = twentyDist(c);

        // Verteilung "mindestens zwei Einsen":
        const atLeastTwoOnes = (() => {
            const pairAB = convolve(convolve(oA, oB), dC);
            const pairAC = convolve(convolve(oA, oC), dB);
            const pairBC = convolve(convolve(oB, oC), dA);
            const triple = convolve(convolve(oA, oB), oC);
            // Summe der Paare, dreifache Überschneidung (Triple) auf einmal reduzieren (dreimal gezählt -> soll einmal zählen):
            // Ergebnis = (AB + AC + BC) - 2 * (ABC)
            return subArrays(addArrays(addArrays(pairAB, pairAC), pairBC), scaleArray(triple, 2));
        })();

        // Verteilung "mindestens zwei Zwanzigen":
        const atLeastTwoTwenties = (() => {
            const pairAB = convolve(convolve(tA, tB), dC);
            const pairAC = convolve(convolve(tA, tC), dB);
            const pairBC = convolve(convolve(tB, tC), dA);
            const triple = convolve(convolve(tA, tB), tC);
            return subArrays(addArrays(addArrays(pairAB, pairAC), pairBC), scaleArray(triple, 2));
        })();

        const qsCounts = [0, 0, 0, 0, 0, 0]; // QS1..QS6
        const total = 20 * 20 * 20; // 8000

        for (let need = 0; need < sumABC.length; need++) {
            const ways = sumABC[need];
            if (!ways) continue;
            if (need <= fw) {
                const fp = fw - need;
                const qs = this.fpToQs(fp);
                qsCounts[qs - 1] += ways;
            }
        }

        // Kritische Sonderfälle einarbeiten
        // 1) Mindestens zwei Einsen => automatischer Erfolg (zusätzliche Rettungen für Fälle, die bisher als Misserfolg gezählt wurden)
        for (let need = 0; need < atLeastTwoOnes.length; need++) {
            const ways = atLeastTwoOnes[need] || 0;
            if (!ways) continue;
            if (need > fw) {
                // Geretteter Erfolg, QS als mindestens 1 (keine FP übrig)
                qsCounts[0] += ways; // QS1
            }
        }

        // 2) Mindestens zwei Zwanzigen => automatischer Patzer (auch wenn es zuvor als Erfolg gezählt wurde)
        for (let need = 0; need < atLeastTwoTwenties.length; need++) {
            const ways = atLeastTwoTwenties[need] || 0;
            if (!ways) continue;
            if (need <= fw) {
                const fp = fw - need;
                const qs = this.fpToQs(fp);
                qsCounts[qs - 1] -= ways; // Erfolge entfernen
            }
        }

        // In Prozentsätze umrechnen (auf 8000 Outcomes normalisiert)
        const probs = qsCounts.map(cnt => (cnt * 100) / total);
        this.qsCache.set(key, probs);
        return probs;
    }

    qsSummary(talent: Talent): string {
        const probs = this.calcQsDistributionFor(talent);
        if (!probs) return '';
        // maximale QS durch FW begrenzen (praktisch schon implizit), dennoch Anzeige kürzen
        // erzeuge eine kompakte Darstellung, nur QS bis zur potenziell erreichbaren Stufe zeigen
        const fw = talent.value || 0;
        // Max mögliche QS durch FW (16+ => QS6, sonst über FP-Band)
        let maxQs: number;
        if (fw >= 16) maxQs = 6;
        else if (fw >= 13) maxQs = 5;
        else if (fw >= 10) maxQs = 4;
        else if (fw >= 7) maxQs = 3;
        else if (fw >= 4) maxQs = 2;
        else maxQs = 1;

        const parts: string[] = [];
        for (let i = 1; i <= maxQs; i++) {
            const p = probs[i - 1];
            parts.push(`QS${i}: ${p.toFixed(1)}%`);
        }
        return parts.join(' | ');
    }
}
