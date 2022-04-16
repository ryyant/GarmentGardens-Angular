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
import { CreateNewUserComponent } from './systemAdministration/create-new-user/create-new-user.component';
import { ViewProfilePageComponent } from './systemAdministration/view-profile-page/view-profile-page.component';
import { ViewSellerProductsComponent } from './systemAdministration/view-seller-products/view-seller-products.component';
import { ViewProductByCategoryComponent } from './systemAdministration/view-product-by-category/view-product-by-category.component';
import { ViewAllRewardsComponent } from './systemAdministration/view-all-rewards/view-all-rewards.component';
import { ViewMyRewardsComponent } from './systemAdministration/view-my-rewards/view-my-rewards.component';
import { ViewDisputesComponent } from './systemAdministration/view-disputes/view-disputes.component';
import { ViewMyCartComponent } from './systemAdministration/view-my-cart/view-my-cart.component';
import { ViewMyTransactionsComponent } from './systemAdministration/view-my-transactions/view-my-transactions.component';
import {SliderModule} from 'primeng/slider';
import { DonatePageComponent } from './donate-page/donate-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CreateDisputeComponent } from './systemAdministration/create-dispute/create-dispute.component';
import { CreateDisputeReq } from './models/create-dispute-req';

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
  { path: 'systemAdministration/viewAllProductsPf', component: ViewAllProductsComponent },
  { path: 'systemAdministration/createNewUser', component: CreateNewUserComponent},
  { path: 'systemAdministration/viewProfilePage', component: ViewProfilePageComponent},
  { path: 'systemAdministration/viewSellerProducts', component: ViewSellerProductsComponent},
  { path: 'systemAdministration/viewProductByCategory', component: ViewProductByCategoryComponent},
  { path: 'systemAdministration/viewProductByCategory/:categoryId', component: ViewProductByCategoryComponent},
  { path: 'systemAdministration/viewAllRewards', component: ViewAllRewardsComponent},
  { path: 'systemAdministration/viewMyRewards', component: ViewMyRewardsComponent},
  { path: 'systemAdministration/viewDisputes', component: ViewDisputesComponent},
  { path: 'systemAdministration/viewMyCart', component: ViewMyCartComponent},
  { path: 'systemAdministration/viewMyTransactions', component: ViewMyTransactionsComponent},
  { path: 'systemAdministration/donatePage', component: DonatePageComponent},
  { path: 'systemAdministration/aboutUs', component: AboutUsComponent},
  { path: 'systemAdministration/createDispute/:orderId', component: CreateDisputeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
