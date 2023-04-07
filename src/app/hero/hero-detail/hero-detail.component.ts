import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../shared/services/hero.service';
import {AbstractHeroComponent} from "../abstract-hero-component";
import {AuthService} from "../../shared/services/auth.service";
import {Talent} from "../../shared/model/hero";


export interface TalentGroup {
    name: string,
    talents: Talent[]
}

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


    getTalentGroups(): string[] {
        console.log("Get talent groups")
        return ["Körper", "Gesellschaft", "Natur", "Wissen", "Handwerk"]
    }

    getTalentGroups2(): TalentGroup[] {
        console.log("Get talent groups")
        let talentGroups = [
            {name: "Körper", talents: this.getBodyTalents()},
            {name: "Gesellschaft", talents: this.getSocialTalents()},
            {name: "Natur", talents: this.getNatureTalents()},
            {name: "Wissen", talents: this.getKnowledgeTalents()},
            {name: "Handwerk", talents: this.getCraftTalents()},
        ];
        console.log(talentGroups)
        return talentGroups
    }

}
