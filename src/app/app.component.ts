import { Component } from '@angular/core';

import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        RouterOutlet
    ],
    styleUrls: ['./app.component.css'],
    standalone: true
})
export class AppComponent {
  title = 'DSA 5 Editor';
}
