import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { CheckoutComponent } from './cashierOperation/checkout/checkout.component';
import { ViewMySaleTransactionsComponent } from './cashierOperation/view-my-sale-transactions/view-my-sale-transactions.component';
import { CreateNewProductComponent } from './systemAdministration/create-new-product/create-new-product.component';
import { ViewAllProductsComponent } from './systemAdministration/view-all-products/view-all-products.component';
import { ViewProductDetailsComponent } from './systemAdministration/view-product-details/view-product-details.component';
import { UpdateProductComponent } from './systemAdministration/update-product/update-product.component';
import { DeleteProductComponent } from './systemAdministration/delete-product/delete-product.component';
import { CreateNewUserComponent } from './systemAdministration/create-new-user/create-new-user.component';
import { ViewProfilePageComponent } from './systemAdministration/view-profile-page/view-profile-page.component';
import { ViewSellerProductsComponent } from './systemAdministration/view-seller-products/view-seller-products.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'cashierOperation/checkout', component: CheckoutComponent },
  { path: 'cashierOperation/viewMySaleTransactions', component: ViewMySaleTransactionsComponent },
  { path: 'systemAdministration/createNewProduct', component: CreateNewProductComponent },
  { path: 'systemAdministration/viewAllProducts', component: ViewAllProductsComponent },
  { path: 'systemAdministration/viewProductDetails', component: ViewProductDetailsComponent },
  { path: 'systemAdministration/viewProductDetails/:productId', component: ViewProductDetailsComponent },
  { path: 'systemAdministration/updateProduct', component: UpdateProductComponent },
  { path: 'systemAdministration/updateProduct/:productId', component: UpdateProductComponent },
  { path: 'systemAdministration/deleteProduct', component: DeleteProductComponent },
  { path: 'systemAdministration/deleteProduct/:productId', component: DeleteProductComponent },
  { path: 'systemAdministration/viewAllProductsPf', component: ViewAllProductsComponent },
  { path: 'systemAdministration/createNewUser', component: CreateNewUserComponent},
  { path: 'systemAdministration/viewProfilePage', component: ViewProfilePageComponent},
  { path: 'systemAdministration/viewSellerProducts', component: ViewSellerProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
