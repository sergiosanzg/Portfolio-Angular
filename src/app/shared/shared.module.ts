import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SergioSanzComponent } from './components/sergio-sanz/sergio-sanz.component';
import { SkillsIconsComponent } from './components/skills-icons/skills-icons.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    SergioSanzComponent,
    SkillsIconsComponent,
    HeaderImageComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SergioSanzComponent,
    SkillsIconsComponent,
    HeaderImageComponent,
    AlertComponent
  ]
})
export class SharedModule { }
