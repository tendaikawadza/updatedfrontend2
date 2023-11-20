

import { RouterModule, Routes } from '@angular/router';
import { IssuedComponent} from './issued.component';



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPanel, TabViewModule } from 'primeng/tabview';
import { CustomerService } from '../service/customer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { InputTextareaModule } from 'primeng/inputtextarea';

import { IssuedAddComponent } from './issued-add/issued-add.component';
import { issuedRoutingModule } from './issued-routing-module';



@NgModule({
    declarations: [

    
    IssuedAddComponent,
    IssuedComponent
  ],
    imports: [
      
      CommonModule,
      TabViewModule,      
      FormsModule,
      ReactiveFormsModule,
      SignaturePadModule,
      TableModule,
      ButtonModule,
      FormsModule,
      ReactiveFormsModule,
      ProgressBarModule,
      InputNumberModule,
      InputTextModule,
      InputTextareaModule,
      issuedRoutingModule
      
  
      
    ],
    providers: [CustomerService ],
  })
  
  export class issuedModule { }
