import { Component } from '@angular/core';

import swordCross from '@iconify/icons-mdi/sword-cross';
import autoFix from '@iconify/icons-mdi/auto-fix';
import handsPray from '@iconify/icons-mdi/hands-pray';
import bagSuitcase from '@iconify/icons-mdi/bag-suitcase';
import contentSave from '@iconify/icons-mdi/content-save';
import viewDashboard from '@iconify/icons-mdi/view-dashboard';
import cardText from '@iconify/icons-mdi/card-text';
import pickaxe from '@iconify/icons-mdi/pickaxe';
import calendarText from '@iconify/icons-mdi/calendar-text';
import {IconService} from "@visurel/iconify-angular";

export const appIcons = {
  'sword-cross': swordCross,
  'magic': autoFix,
  'pickaxe': pickaxe,
  'calendar-text': calendarText,
  'text': cardText,
  'dashboard': viewDashboard,
  'liturgic': handsPray,
  'save': contentSave,
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
