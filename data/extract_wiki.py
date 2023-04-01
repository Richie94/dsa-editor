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
            with open("ulisses-regelwiki.de/" + advantage_file) as g:
                soup_advantage = BeautifulSoup(g.read(), features="html.parser")
                advantage_descr = soup_advantage.find_all("div", {"class": "spalte1"})
                adv_dict = {}
                for advantage in advantage_descr:
                    adv_dict[advantage.text.strip().replace(":", "")] = advantage.next_sibling.next_element.text.strip()
                advantages.append({
                    "name": soup_advantage.find("div", {"class": "header"}).text.strip(),
                    "link": "https://ulisses-regelwiki.de/" + advantage_file,
                    "description": adv_dict.get("Regel"),
                    "requirements": adv_dict.get("Voraussetzung"),
                    "ap": adv_dict.get("AP-Wert"),
                })
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
            with open("ulisses-regelwiki.de/" + disadvantage_file) as g:
                soup_disadvantage = BeautifulSoup(g.read(), features="html.parser")
                disadvantage_descr = soup_disadvantage.find_all("div", {"class": "spalte1"})
                disadv_dict = {}
                for disadvantage in disadvantage_descr:
                    disadv_dict[disadvantage.text.strip().replace(":", "")] = disadvantage.next_sibling.next_element.text.strip()
                disadvantages.append({
                    "name": soup_disadvantage.find("div", {"class": "header"}).text.strip(),
                    "link": "https://ulisses-regelwiki.de/" + disadvantage_file,
                    "description": disadv_dict.get("Regel"),
                    "requirements": disadv_dict.get("Voraussetzung"),
                    "ap": disadv_dict.get("AP-Wert"),
                })
    with open("disadvantages.json", "w") as f:
        json.dump(disadvantages, f, ensure_ascii=False)
    return disadvantages

if __name__ == "__main__":
    # parse_armor()
    # parse_weapons()
    parse_advantages()
    parse_disadvantages()
