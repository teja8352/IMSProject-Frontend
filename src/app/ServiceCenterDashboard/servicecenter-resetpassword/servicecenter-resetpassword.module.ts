import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicecenterResetpasswordPage } from './servicecenter-resetpassword.page';

const routes: Routes = [
  {
    path: '',
    component: ServicecenterResetpasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicecenterResetpasswordPage]
})
export class ServicecenterResetpasswordPageModule {}
