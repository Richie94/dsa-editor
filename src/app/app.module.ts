import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AddNewHeroDialog, HeroesComponent} from './hero/herolist/heroes.component';
import {HeroDetailComponent} from './hero/hero-detail/hero-detail.component';
import {HeroNotesComponent} from './hero/hero-notes/hero-notes.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatListModule} from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider'
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import {HeroGeneralComponent} from './hero/hero-general/hero-general.component';
import {HeroComponent} from './hero/hero.component';
import {AuthService} from "./shared/services/auth.service";
import {SignInComponent} from './sign-in/sign-in/sign-in.component';
import {HeroFightComponent} from './hero/hero-fight/hero-fight.component';
import {HeroMagicComponent} from './hero/hero-magic/hero-magic.component';
import {HeroLiturgicComponent} from './hero/hero-liturgic/hero-liturgic.component';
import {HeroInventoryComponent} from './hero/hero-inventory/hero-inventory.component';
import {IconModule} from "@visurel/iconify-angular";
import {MatGridListModule} from "@angular/material/grid-list";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import {environment} from './environments/environment';
import {MatTabsModule} from '@angular/material/tabs';
import {TextFieldModule} from '@angular/cdk/text-field';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatListModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDividerModule,
        MatTableModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        IconModule,
        MatGridListModule,
        (() => initializeApp(environment.firebase)),
        (() => getAuth()),
        (() => getFirestore()),
        (() => getStorage()),
        MatTabsModule,
        TextFieldModule,
        AppComponent,
        HeroesComponent,
        AddNewHeroDialog,
        HeroComponent,
        HeroGeneralComponent,
        HeroDetailComponent,
        HeroNotesComponent,
        SignInComponent,
        HeroFightComponent,
        HeroMagicComponent,
        HeroLiturgicComponent,
        HeroInventoryComponent
    ],
    providers: [
        AuthService,
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { touchendHideDelay: 5000 } as MatTooltipDefaultOptions }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
