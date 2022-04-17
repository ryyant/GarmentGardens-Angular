import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ConfirmationService } from 'primeng/api';
import { RoleEnum } from 'src/app/models/role-enum';

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
  productDeleted: boolean;
  qtyToAdd: number = 0;


  sizes: string[] = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
  selectedSize: string | undefined;

  recommendedSize: string | undefined;
  loginDialogue: boolean;
  displayDialog: boolean;
  role: RoleEnum | undefined;

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    public sessionService: SessionService,
    private productService: ProductService
  ) {
    this.productId = null;
    this.productToView = new Product();
    this.retrieveProductError = false;
    this.error = false;
    this.showMessage = false;
    this.productDeleted = false;
    this.loginDialogue = false;
    this.displayDialog = false;
    // UNDEFINED IS NOT LOGGED IN, REQUIRED.
    this.role = undefined;
  }

  ngOnInit(): void {
    this.recommendedSize = this.sessionService.getRecommendedSize();
    this.selectedSize = this.recommendedSize !== null ? this.recommendedSize : undefined;

    // IMPORTANT
    if (this.sessionService?.getIsLogin() === true) {
      this.role = this.sessionService?.getCurrentUser()?.role;
    }

    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    if (this.productId != null) {
      this.productService
        .getProductByProductId(parseInt(this.productId))
        .subscribe({
          next: (response) => {
            this.productToView = response;
            console.log(response);
          },
          error: (error) => {
            this.retrieveProductError = true;
            console.log(error);

          },
        });
    }
  }


  addToCart() {
    if (this.sessionService.getIsLogin() == false) {
      this.loginDialogue = true;
      return;
    }
    if (
      this.productToView != null &&
      this.productToView.quantityOnHand != null
    ) {
      if (
        this.qtyToAdd == 0 ||
        this.qtyToAdd > this.productToView.quantityOnHand
      ) {
        this.error = true;
        this.showMessage = true;
        this.errorMessage = 'Invalid quantity Input!';
      } else {
        this.errorMessage = '';
        // CALL SERVICE HERE, TAKE IN qtyToAdd and productToView
        this.cartService
          .addToCart(this.productToView, this.qtyToAdd)
          .subscribe({
            next: (response) => {
              this.error = false;
              this.showMessage = true;
              this.errorMessage = 'Added to Cart!';
              this.qtyToAdd = 0;
            },
            error: (error) => {
              this.error = true;
              this.showMessage = true;
              this.errorMessage = "Add to Cart failed!";
            },
          });
      }
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

  displayDialogBox() {
    this.displayDialog=true;
  }

  deleteProduct() {
    if (this.productId != null) {
      this.productService.deleteProduct(parseInt(this.productId)).subscribe({
        next: (response) => {
          this.error = false;
          this.showMessage = true;
          this.errorMessage = 'Successfully deleted!';
          this.productDeleted = true;
        },
        error: (error) => {
          this.error = true;
          this.showMessage = true;
          this.errorMessage = "Delete product failed!";
        },
      });
    }
  }
}
