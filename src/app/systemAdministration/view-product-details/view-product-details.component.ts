import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css'],
})
export class ViewProductDetailsComponent implements OnInit {
  productId: string | null;
  productToView: Product;
  retrieveProductError: boolean;
  error: boolean;
  showMessage: boolean;
  errorMessage: string | undefined;

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private productService: ProductService
  ) {
    this.productId = null;
    this.productToView = new Product();
    this.retrieveProductError = false;
    this.error = false;
    this.showMessage = false;
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');

    if (this.productId != null) {
      this.productService
        .getProductByProductId(parseInt(this.productId))
        .subscribe({
          next: (response) => {
            this.productToView = response;
            console.log(this.productToView);
          },
          error: (error) => {
            this.retrieveProductError = true;
            console.log('********** ViewProductDetailsComponent.ts: ' + error);
          },
        });
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.deleteProduct();
      },
    });
  }

  deleteProduct() {
    if (this.productId != null) {
      this.productService.deleteProduct(parseInt(this.productId)).subscribe({
        next: (response) => {
          this.showMessage = true;
          this.errorMessage = 'Successfully deleted!';
          this.router.navigate(['/systemAdministration/viewSellerProducts']);
        },
        error: (error) => {
          this.error = true;
          this.showMessage = true;
          this.errorMessage = error;
        },
      });
    }
  }
}
