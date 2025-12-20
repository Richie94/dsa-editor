import os.path
import re
from bs4 import BeautifulSoup
from tqdm import tqdm
import unicodedata
import json


def extract_weapon(filename, technique):
    try:
        with open(filename) as f:
            soup = BeautifulSoup(f.read(), features="html.parser")
            disadvantage_elem = soup.find("strong", string="Waffennachteil:")
            if disadvantage_elem:
                disadvantage = unicodedata.normalize("NFKD", disadvantage_elem.parent.text) \
                    .replace("Waffennachteil: ", "")
            else:
                disadvantage = None
            advantage_elem = soup.find("strong", string="Waffenvorteil:")
            if advantage_elem:
                advantage = unicodedata.normalize("NFKD", advantage_elem.parent.text) \
                    .replace("Waffenvorteil: ", "")
            else:
                advantage = None

            d = parse_table(soup)
            name = soup.find('title').string.split(" - DSA")[0]

            at_pa_mod = d.get("AT/PA-Mod")
            if at_pa_mod and "/" in at_pa_mod:
                at_mod = at_pa_mod.split("/")[0]
                pa_mod = at_pa_mod.split("/")[1]
            else:
                at_mod = None
                pa_mod = None
            return {
                "name": name,
                "technique": technique,
                "link": "https://ulisses-regelwiki.de/" + filename.split("/")[-1],
                "tp": d.get("TP"),
                "l_s": d.get("L+S"),
                "lz": d.get("LZ"),
                "at_mod": at_mod,
                "pa_mod": pa_mod,
                "rw": d.get("RW"),
                "ammo": d.get("Munition"),
                "weight": d.get("Gewicht"),
                "length": d.get("Länge"),
                "price": d.get("Preis"),
                "complexity": d.get("Komplexität"),
                "disadvantage": disadvantage,
                "advantage": advantage,
            }
    except FileNotFoundError as e:
        print("Not found file " + filename)
        return None
    except Exception as e:
        print("Error in " + filename)
        print(e)
        return None


def extract_armor(filename):
    try:
        with open(filename) as f:
            soup = BeautifulSoup(f.read(), features="html.parser")
            disadvantage_elem = soup.find("strong", string="Rüstungsnachteil:")
            if disadvantage_elem:
                disadvantage = unicodedata.normalize("NFKD", disadvantage_elem.parent.text
                                                     .replace("Rüstungsnachteil: ", ""))

            else:
                disadvantage = None
            advantage_elem = soup.find("strong", string="Rüstungsvorteil:")
            if advantage_elem:
                advantage = unicodedata.normalize("NFKD", advantage_elem.parent.text
                                                  .replace("Rüstungsvorteil: ", ""))

            else:
                advantage = None

            d = parse_table(soup)
            name = soup.find('title').string.split(" - DSA")[0]

            return {
                "name": name,
                "rs": d.get("Rüstungsschutz"),
                "link": "https://ulisses-regelwiki.de/" + filename.split("/")[-1],
                "be": d.get("Belastungsstufe"),
                "zs": d.get("zusätzliche Abzüge"),
                "weight": d.get("Gewicht"),
                "price": d.get("Preis"),
                "complexity": d.get("Komplexität"),
                "disadvantage": disadvantage,
                "advantage": advantage,
            }
    except FileNotFoundError as e:
        print("Not found file " + filename)
        return None
    except Exception as e:
        print("Error in " + filename)
        print(e)
        return None


def parse_table(soup):
    row = [x.text.strip() for x in soup.find_all("tr")[0].children if x.text != "\n"]
    row2 = [x.text.strip() if x.text.strip() != "-" else "" for x in soup.find_all("tr")[1].children if x.text != "\n"]
    return {k: v for k, v in zip(row, row2)}


def parse_weapons():
    weapons = []
    with open("ulisses-regelwiki.de/RS_Waffen.html") as f:
        soup = BeautifulSoup(f.read(), features="html.parser")
        weapon_classes = [e["href"] for e in soup.find_all("a", {"class": "ulSubMenu"})]
        for weapon_class in tqdm(weapon_classes):
            with open("ulisses-regelwiki.de/" + weapon_class) as g:
                soup_weapon_class = BeautifulSoup(g.read(), features="html.parser")
                weapon_files = [e["href"] for e in soup_weapon_class.find_all("a", {"class": "ulSubMenu"})]
                for weapon in weapon_files:
                    extracted_weapon = extract_weapon("ulisses-regelwiki.de/" + weapon,
                                                      weapon_class.replace(".html", ""))
                    if extracted_weapon:
                        weapons.append(extracted_weapon)
    with open("weapons.json", "w") as f:
        json.dump(weapons, f, ensure_ascii=False)
    return weapons


def parse_armor():
    armors = []
    with open("ulisses-regelwiki.de/RS_Ruestung.html") as f:
        soup = BeautifulSoup(f.read(), features="html.parser")
        armor_classes = [e["href"] for e in soup.find_all("a", {"class": "ulSubMenu"})]
        for armor_class in tqdm(armor_classes):
            with open("ulisses-regelwiki.de/" + armor_class) as g:
                soup_armor_class = BeautifulSoup(g.read(), features="html.parser")
                armor_files = [e["href"] for e in soup_armor_class.find_all("a", {"class": "ulSubMenu"})]
                for armor in armor_files:
                    extracted_armor = extract_armor("ulisses-regelwiki.de/" + armor)
                    if extracted_armor:
                        armors.append(extracted_armor)
                extracted_armor = extract_armor("ulisses-regelwiki.de/" + armor_class)
                if extracted_armor:
                    armors.append(extracted_armor)
    with open("armor.json", "w") as f:
        json.dump(armors, f, ensure_ascii=False)
    return armors


def parse_advantages():
    advantages = []
    with open("ulisses-regelwiki.de/vorteilauswahl.html") as f:
        soup = BeautifulSoup(f.read(), features="html.parser")
        advantage_files = [e["href"].split("?vorteil=")[0] for e in soup.find_all("a", href=True) if
                             "?vorteil=" in e["href"]]
        for advantage_file in tqdm(advantage_files):
            try:
                parse_advantage_file(advantage_file, advantages)
            except Exception as e:
                print(advantage_file, e)
    with open("advantages.json", "w") as f:
        json.dump(advantages, f, ensure_ascii=False)
    return advantages


def parse_disadvantages():
    disadvantages = []
    with open("ulisses-regelwiki.de/nachteilauswahl.html") as f:
        soup = BeautifulSoup(f.read(), features="html.parser")
        disadvantage_files = [e["href"].split("?nachteil=")[0] for e in soup.find_all("a", href=True) if
                             "?nachteil=" in e["href"]]
        for disadvantage_file in tqdm(disadvantage_files):
            try:
                parse_advantage_file(disadvantage_file, disadvantages)
            except Exception as e:
                print(disadvantage_file, e)
    with open("disadvantages.json", "w") as f:
        json.dump(disadvantages, f, ensure_ascii=False)
    return disadvantages


def parse_advantage_file(advantage_file, advantages):
    with open("ulisses-regelwiki.de/" + advantage_file) as g:
        soup_advantage = BeautifulSoup(g.read(), features="html.parser")
        advantage_descr = soup_advantage.find_all("div", {"class": "spalte1"})
        adv_dict = {}
        for advantage in advantage_descr:
            adv_dict[advantage.text.strip().replace(":", "")] = advantage.next_sibling.next_element.text.strip()

        ap_value = adv_dict.get("AP-Wert")
        title = soup_advantage.find("div", {"class": "header"}).text.strip()
        if "/" in ap_value:
            # we have multiple AP values
            ap = [int(x.replace("–", "-")) for x in re.split("/| ", ap_value) if x.lstrip("–").isnumeric()]
            if len(ap) > 4:
                print("Skipping " + advantage_file + " because of too many AP values" + ap_value)
                return
            if "Fertigkeit" in ap_value:
                adv_type = "talent"
            elif "Kampftechnik" in ap_value:
                adv_type = "combat"
            else:
                adv_type = "level"
            advantages.append({
                "name": title,
                "description": adv_dict.get("Regel"),
                "requirements": adv_dict.get("Voraussetzung"),
                "ap": ap,
                "type": adv_type
            })
        else:
            if "I-" in title:
                adv_type = "level"
                ap_simple = int(ap_value.split(" Abenteuerpunkt")[0])
                if "I-III" in title:
                    ap = [ap_simple, 2 * ap_simple, 3 * ap_simple]
                elif "I-II" in title:
                    ap = [ap_simple, 2 * ap_simple]
                elif "I-VII" in title:
                    ap = [ap_simple, 2 * ap_simple, 3 * ap_simple, 4 * ap_simple, 5 * ap_simple, 6 * ap_simple, 7 * ap_simple]
                else:
                    print("Skipping " + advantage_file + " because of too many AP values" + ap_value)
                    return
            else:
                ap = int(ap_value.split(" Abenteuerpunkte")[0].replace("–", "-"))
                adv_type = "simple"

            advantages.append({
                "name": title.split(" I-")[0],
                "description": adv_dict.get("Regel"),
                "requirements": adv_dict.get("Voraussetzung"),
                "ap": ap,
                "type": adv_type
            })


def parse_skills(page, file_name, field_dict):
    skills = []
    with open("ulisses-regelwiki.de/" + page) as f:
        soup = BeautifulSoup(f.read(), features="html.parser")
        # use ulSubMenu to get all skills
        skill_classes = [e["href"] for e in soup.find_all("a", {"class": "ulSubMenu"})]
        for skill_class in tqdm(skill_classes):
            with open("ulisses-regelwiki.de/" + skill_class, errors="ignore") as g:
                soup_skill = BeautifulSoup(g.read(), features="html.parser")
                # find again by ulSubMenu
                skill_files = soup_skill.find_all("a", {"class": "ulSubMenu"})
                for skill_file in skill_files:
                    if not os.path.isfile("ulisses-regelwiki.de/" + skill_file["href"]):
                        continue
                    with open("ulisses-regelwiki.de/" + skill_file["href"], errors="ignore") as h:
                        soup_skill_file = BeautifulSoup(h.read(), features="html.parser")
                        skill_descr = soup_skill_file.find_all("strong")
                        skill_dict = {}
                        for skill in skill_descr:
                            if skill.next_sibling:
                                skill_text = skill.text.strip().replace(":", "")
                                skill_dict[skill_text] = skill.parent.text.strip().removeprefix(skill_text + ":").strip()
                        skill_json = {
                            "name": soup_skill_file.find('title').string.split(" - DSA")[0],
                            "link": "https://ulisses-regelwiki.de/" + skill_file["href"],
                        }
                        for field, mp in field_dict.items():
                            for m in mp:
                                if skill_dict.get(m):
                                    skill_json[field] = skill_dict.get(m)
                        skills.append(skill_json)
    with open(file_name, "w") as f:
        json.dump(skills, f, ensure_ascii=False)
    return skills


if __name__ == "__main__":
    # parse_armor()
    # parse_weapons()
    parse_advantages()
    parse_disadvantages()
    # parse_skills("rgergegregre.html", "magic-skills.json", {"description": ["Regel", "Wirkung"], "requirements": ["Voraussetzung"], "ap": ["AP-Wert"], "asp": ["AsP-Kosten"], "spell_duration": ["Wirkungsdauer"]})
    # parse_skills("frefre.html", "profan-skills.json", {"description": ["Regel"], "requirements": ["Voraussetzung"], "ap": ["AP-Wert"]})
    # parse_skills("karmale_SF.html", "karmal-skills.json", {"description": ["Regel"], "requirements": ["Voraussetzung"], "ap": ["AP-Wert"]})
