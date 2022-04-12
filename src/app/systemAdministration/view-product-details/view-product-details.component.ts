import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css'],
})
export class ViewProductDetailsComponent implements OnInit {
  productId: string | null;
  productToView: Product | null;
  retrieveProductError: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private productService: ProductService
  ) {
    this.productId = null;
    this.productToView = new Product();
    this.retrieveProductError = false;
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');

    if (this.productId != null) {
      this.productService
        .getProductByProductId(parseInt(this.productId))
        .subscribe({
          next: (response) => {
            this.productToView = response;
          },
          error: (error) => {
            this.retrieveProductError = true;
            console.log('********** ViewProductDetailsComponent.ts: ' + error);
          },
        });
    }
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }
}
