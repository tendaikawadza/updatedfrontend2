import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Stock } from '../model/stock';
import { AuthenticationService } from '../service/authentication.service';
import { StockService } from '../service/stock.service';

import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-stockdashboard',
    templateUrl: './stockdashboard.component.html',
    styleUrls: ['./stockdashboard.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe]
})
export class StockdashboardComponent {
goToIssued() {
throw new Error('Method not implemented.');
}
    constructor(private router: Router, private auth: AuthenticationService, private productService: StockService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private fb: FormBuilder) { }
    items = [
        { label: 'Home', icon: 'pi pi-fw pi-home' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        { label: 'Logout', icon: 'pi pi-fw pi-power-off' },
    ];
    productDialog = false;

    products: Stock[] = [];
    categoryOpt = [
        { name: 'accounts', code: 'accounts' },
        { name: 'admini', code: 'admini' },
        { name: 'human resourse', code: 'human resourse' },

    ];

    product: any;

    selectedProducts: Stock[];

    submitted = false;
    addProductForm: FormGroup;
    isEdit = false;
    pcodeList: any[];
orignalData:any[];
    selectedCode: any;


    ngOnInit() {
       this.forms();
        this.getAllproducts();
      
    }
    forms(){
        this.addProductForm = this.fb.group({
            date: ['', [Validators.required]],
            productName: ['', [Validators.required]],
            productCode: ['', [Validators.required]],
            quantity: ['', [Validators.required]],
            productId: [''],

        });
    }
    getAllproducts() {
        this.productService.getAllProducts().subscribe(data => {
            console.log(data)
            this.products = data;    
            this.orignalData =data;         
            const mp:any = new Map(data.map((o: { productCode: any; }) => [o.productCode, { ...o, count: 0 }]));

            for (const { productCode } of data) {
              mp.get(productCode).count++;
            }
            
            this.pcodeList= Array.from(mp.values()).map((i:any)=>{
                i['pcodeCount']=i.productCode +' ('+i.count+')';
                return i;
                });
            
            console.log(this.pcodeList);
        });
    }
    getPcode(code:any){ 
        console.log(this.selectedCode);    
        this.products=this.orignalData.filter(i=>i.productCode === this.selectedCode.productCode); 
    }
    get f(): any {
        return this.addProductForm.controls;
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEdit = false;
        this.forms();
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Stock) {
        this.isEdit = true;
        this.addProductForm.patchValue(product);
        this.productDialog = true;
    
    }

    deleteProduct(item:any) {
        console.log(item);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + item.productCode + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProduct(item.productId).subscribe(data=>{
                    this.products = this.products.filter(val => val.productId !== item.productId);
                    this.product = {};
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
               
                });
                }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    onSubmit() {
        console.log(this.addProductForm.value)
        if (this.addProductForm.invalid) {
            return
        }
        const item = this.addProductForm.value;
        this.submitted = true;
        if (this.isEdit === false) {          
            console.log(item);
            this.productService.addProduct(item).subscribe((data: any) => {
                if (data) {
                    this.products.push(item);
                    this.messageService.add({ severity: 'success', summary: 'Product successfully added to the catalog', detail: 'Via MessageService' });
                }
                else {
                    this.messageService.add({ severity: 'success', summary: 'Product could not be Added to the catalog : Check Specification of your product', detail: 'Via MessageService' });
                }
                this.productDialog = false;

            })
        } else {

            this.productService.updateProducts(item.productId, item).subscribe((data: any) => {
                if (data) {
                    this.getAllproducts();
                    this.messageService.add({ severity: 'success', summary: 'Product successfully Updated to the catalog', detail: 'Via MessageService' });
                }
                else {
                    this.messageService.add({ severity: 'success', summary: 'Product could not be Updated to the catalog : Check Specification of your product', detail: 'Via MessageService' });
                }
                this.productDialog = false;

            })

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};

        }

    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].productId === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    logout() {
        console.log('ddd')
        this.auth.logOut();
        this.router.navigate(['login']);
    }
}

