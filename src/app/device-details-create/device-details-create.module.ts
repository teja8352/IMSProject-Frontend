import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceDetailsCreatePage } from './device-details-create.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceDetailsCreatePage
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
  declarations: [DeviceDetailsCreatePage]
})
export class DeviceDetailsCreatePageModule {}
