import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadgingSpinerComponent } from './components/loadging-spiner/loadging-spiner.component';
import { RouterModule } from '@angular/router';
import { CustomCursorComponent } from './components/custom-cursor/cursor-component';
import { SergioSanzComponent } from './components/sergio-sanz/sergio-sanz.component';
import { SkillsIconsComponent } from './components/skills-icons/skills-icons.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { AlertComponent } from './components/alert/alert.component';
import { MaterialModule } from './modules/material.module';



@NgModule({
  declarations: [
    LoadgingSpinerComponent,
    CustomCursorComponent,
    SergioSanzComponent,
    SkillsIconsComponent,
    HeaderImageComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    LoadgingSpinerComponent,
    CustomCursorComponent,
    SergioSanzComponent,
    SkillsIconsComponent,
    HeaderImageComponent,
    AlertComponent
  ]
})
export class SharedModule { }
