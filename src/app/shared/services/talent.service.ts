import {Injectable} from '@angular/core';
import {Talent} from "../model/hero";

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  constructor() {
  }


  TALENTS = [
    {name: "Fliegen", probe: "MU/IN/CH", sf: "B", value: 0},
    {name: "Gaukeleien", probe: "MU/CH/FF", sf: "A", value: 0},
    {name: "Klettern", probe: "MU/GE/KK", sf: "B", value: 0},
    {name: "Körperbeherrschung", probe: "GE/GE/KO", sf: "D", value: 0},
    {name: "Kraftakt", probe: "KO/KK/KK", sf: "B", value: 0},
    {name: "Reiten", probe: "CH/GE/KK", sf: "B", value: 0},
    {name: "Schwimmen", probe: "GE/KO/KK", sf: "B", value: 0},
    {name: "Selbstbeherrschung", probe: "MU/MU/KO", sf: "D", value: 0},
    {name: "Singen", probe: "KL/CH/KO", sf: "A", value: 0},
    {name: "Sinnesschärfe", probe: "KL/IN/IN", sf: "D", value: 0},
    {name: "Tanzen", probe: "KL/CH/GE", sf: "A", value: 0},
    {name: "Taschendiebstahl", probe: "MU/FF/GE", sf: "B", value: 0},
    {name: "Verbergen", probe: "MU/IN/CH", sf: "C", value: 0},
    {name: "Zechen", probe: "KL/KO/KK", sf: "A", value: 0},
    {name: "Bekehren & Überzeugen", probe: "MU/KL/CH", sf: "B", value: 0},
    {name: "Betören", probe: "MU/CH/CH", sf: "B", value: 0},
    {name: "Einschüchtern", probe: "MU/IN/CH", sf: "B", value: 0},
    {name: "Etikette", probe: "KL/IN/CH", sf: "B", value: 0},
    {name: "Gassenwissen", probe: "KL/IN/CH", sf: "C", value: 0},
    {name: "Menschenkenntnis", probe: "KL/IN/CH", sf: "C", value: 0},
    {name: "Überreden", probe: "MU/IN/CH", sf: "C", value: 0},
    {name: "Verkleiden", probe: "IN/CH/GE", sf: "B", value: 0},
    {name: "Willenskraft", probe: "MU/IN/CH", sf: "D", value: 0},
    {name: "Fährtensuchen", probe: "MU/IN/GE", sf: "C", value: 0},
    {name: "Fesseln", probe: "KL/FF/KK", sf: "A", value: 0},
    {name: "Fischen & Angeln", probe: "FF/GE/KO", sf: "A", value: 0},
    {name: "Orientierung", probe: "KL/IN/IN", sf: "B", value: 0},
    {name: "Pflanzenkunde", probe: "KL/FF/KO", sf: "C", value: 0},
    {name: "Tierkunde", probe: "MU/MU/CH", sf: "C", value: 0},
    {name: "Wildnisleben", probe: "MU/GE/KO", sf: "C", value: 0},
    {name: "Brett- & Glückspiel", probe: "KL/KL/IN", sf: "A", value: 0},
    {name: "Geographie", probe: "KL/KL/IN", sf: "B", value: 0},
    {name: "Geschichtswissen", probe: "KL/KL/IN", sf: "B", value: 0},
    {name: "Götter & Kulte", probe: "KL/KL/IN", sf: "B", value: 0},
    {name: "Kriegskunst", probe: "MU/KL/IN", sf: "B", value: 0},
    {name: "Magiekunde", probe: "KL/KL/IN", sf: "C", value: 0},
    {name: "Mechanik", probe: "KL/KL/FF", sf: "B", value: 0},
    {name: "Rechnen", probe: "KL/KL/IN", sf: "A", value: 0},
    {name: "Rechtskunde", probe: "KL/KL/IN", sf: "A", value: 0},
    {name: "Sagen & Legenden", probe: "KL/KL/IN", sf: "B", value: 0},
    {name: "Sphärenkunde", probe: "KL/KL/IN", sf: "B", value: 0},
    {name: "Sternkunde", probe: "KL/KL/IN", sf: "A", value: 0},
    {name: "Alchimie", probe: "MU/KL/FF", sf: "C", value: 0},
    {name: "Boote & Schiffe", probe: "FF/GE/KK", sf: "B", value: 0},
    {name: "Fahrzeuge", probe: "CH/FF/KO", sf: "A", value: 0},
    {name: "Handel", probe: "KL/IN/CH", sf: "B", value: 0},
    {name: "Heilkunde Gift", probe: "MU/KL/IN", sf: "B", value: 0},
    {name: "Heilkunde Krankheiten", probe: "MU/IN/KO", sf: "B", value: 0},
    {name: "Heilkunde Seele", probe: "IN/CH/KO", sf: "B", value: 0},
    {name: "Heilkunde Wunden", probe: "KL/FF/FF", sf: "D", value: 0},
    {name: "Holzbearbeitung", probe: "FF/GE/KK", sf: "B", value: 0},
    {name: "Lebensmittelbearbeitung", probe: "IN/FF/FF", sf: "A", value: 0},
    {name: "Lederbearbeitung", probe: "FF/GE/KO", sf: "B", value: 0},
    {name: "Malen & Zeichnen", probe: "IN/FF/FF", sf: "A", value: 0},
    {name: "Metallbearbeitung", probe: "FF/KO/KK", sf: "C", value: 0},
    {name: "Musizieren", probe: "CH/FF/KO", sf: "A", value: 0},
    {name: "Schlösserknacken", probe: "IN/FF/FF", sf: "C", value: 0},
    {name: "Steinbearbeitung", probe: "FF/FF/KK", sf: "A", value: 0},
    {name: "Stoffbearbeitung", probe: "KL/FF/FF", sf: "A", value: 0}
  ]


  initTalents(): Talent[] {
    return this.TALENTS.map(talent => {
      return {
        name: talent.name,
        probe: talent.probe,
        sf: talent.sf,
        value: talent.value
      };
    })
  }
}
