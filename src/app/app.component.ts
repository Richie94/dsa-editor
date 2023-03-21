import { Component } from '@angular/core';

import swordCross from '@iconify/icons-mdi/sword-cross';
import autoFix from '@iconify/icons-mdi/auto-fix';
import handsPray from '@iconify/icons-mdi/hands-pray';
import bagSuitcase from '@iconify/icons-mdi/bag-suitcase';
import {IconService} from "@visurel/iconify-angular";

export const appIcons = {
  'sword-cross': swordCross,
  'magic': autoFix,
  'liturgic': handsPray,
  'inventory': bagSuitcase
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DSA 5 Editor';

  constructor(iconService: IconService){
    iconService.registerAll(appIcons);
  }
}
