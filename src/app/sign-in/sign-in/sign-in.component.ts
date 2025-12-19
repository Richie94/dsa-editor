import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    imports: [
        MatFormField,
        MatCardContent,
        MatCardTitle,
        MatCardHeader,
        MatCard,
        MatToolbar,
        MatInput,
        MatButton,
        MatLabel
    ],
    styleUrls: ['./sign-in.component.scss'],
    standalone: true
})
export class SignInComponent {
  constructor(
    public authService: AuthService
  ){}

}
