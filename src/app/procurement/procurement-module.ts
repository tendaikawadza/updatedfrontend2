

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CustomerService } from '../service/customer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { ProcurementComponent } from './procurement.component';
import { ProcurementMinutesComponent } from './procurement-minutes/procurement-minutes.component';
import { ProcurementQuatationsComponent } from './procurement-quatations/procurement-quatations.component';
import { MinutesComponent } from '../component/minutes/minutes.component';
import { ProcurementPurchaseRequestsComponent } from './procurement-purchase-requests/procurement-purchase-requests.component';
import { ProcurementRoutingModule } from './procurement-routing.module';
import { PurchaseAuthorisationFormComponent } from './purchase-authorisation-form/purchase-authorisation-form.component';
import { ProcurementMinutesAllComponent } from './procurement-minutes-all/procurement-minutes-all.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [
        ProcurementMinutesComponent,
        ProcurementQuatationsComponent,
        ProcurementComponent,
        MinutesComponent,
        ProcurementMinutesAllComponent ,
        ProcurementPurchaseRequestsComponent,
        PurchaseAuthorisationFormComponent

    ],

    imports: [
        CommonModule,
        TabViewModule,
        ProcurementRoutingModule,
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
        FileUploadModule


    ],
    providers: [CustomerService],
})
export class ProcurementModule { }
