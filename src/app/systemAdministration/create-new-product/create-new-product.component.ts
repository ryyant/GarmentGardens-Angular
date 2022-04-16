import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tag.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Tag } from '../../models/tag';



@Component({
  selector: 'app-create-new-product',
  templateUrl: './create-new-product.component.html',
  styleUrls: ['./create-new-product.component.css']
})
export class CreateNewProductComponent implements OnInit {
  submitted: boolean;
  newProduct: Product;
  categoryId: number | null;
  tagIds: string[];

  categories: Category[];
  tags: Tag[];


  message: string;
  showMessage: boolean;
  error: boolean;




  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private tagService: TagService) {
    this.submitted = false;
    this.newProduct = new Product();
    //this.newProduct.productRating = 1;
    this.categoryId = null;
    this.tagIds = new Array();
    this.categories = new Array();
    this.tags = new Array();
    this.message = '';
    this.error = false;
    this.showMessage = false;
  }

  ngOnInit(): void {
    this.checkAccessRight()

    this.categoryService.getLeafCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log('********** CreateNewProductComponent.ts: ' + error);
      }
    });
    

    this.tagService.getTags().subscribe({
      next: (response) => {
        this.tags = response;
      },
      error: (error) => {
        console.log('********** CreateNewProductComponent.ts: ' + error);
      }
    });

    console.log(this.tags);
  }



  clear() {
    this.submitted = false;
    this.newProduct = new Product();
    // this.newProduct.productRating = 1;
    this.categoryId = null;
    this.tagIds = new Array();
  }



  create(createProductForm: NgForm) {
    let longTagIds: number[] = new Array();

    for (var i = 0; i < this.tagIds.length; i++) {
      longTagIds.push(parseInt(this.tagIds[i]));
    }

    this.submitted = true;

    if (createProductForm.valid) {
      this.productService.createNewProduct(this.newProduct, this.categoryId, longTagIds).subscribe({
        next: (response) => {
          let newProductId: number = response;
          this.showMessage = true;
          this.error = false;
          this.message = "New product " + newProductId + " created successfully";

          this.newProduct = new Product();
          // this.newProduct.productRating = 1;
          this.categoryId = null;
          this.tagIds = new Array();
          createProductForm.resetForm();
          createProductForm.reset();
        },
        error: (error) => {
          this.showMessage = true;
          this.error = true;
          this.message = "An error has occurred while creating the new product: " + error;

          console.log('********** CreateNewProductComponent.ts: ' + error);
        }
      });
    }
  }



  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(["/accessRightError"]);
    }
  }
}
