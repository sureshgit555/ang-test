import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {
    product = "Product Test";
    qty = 1;

    addQty() {
        this.qty++;
    }
}
