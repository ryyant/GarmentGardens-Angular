import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedModule } from 'primeng/api';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { Toast, ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { CarouselModule } from 'primeng/carousel';
import {VirtualScrollerModule} from 'primeng/virtualscroller';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
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
import { ViewAllRewardsComponent } from './systemAdministration/view-all-rewards/view-all-rewards.component';
import { ViewProductByCategoryComponent } from './view-product-by-category/view-product-by-category.component';
import { ViewRewardDetailsComponent } from './systemAdministration/view-reward-details/view-reward-details.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    SidebarComponent,
    BreadcrumbComponent,
    AccessRightErrorComponent,
    CheckoutComponent,
    ViewMySaleTransactionsComponent,
    CreateNewProductComponent,
    ViewAllProductsComponent,
    ViewProductDetailsComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    CreateNewUserComponent,
    ViewProfilePageComponent,
    ViewSellerProductsComponent,
    ViewAllRewardsComponent,
    ViewProductByCategoryComponent,
    ViewRewardDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BreadcrumbModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CheckboxModule,
    ColorPickerModule,
    CommonModule,
    ConfirmDialogModule,
    DataViewModule,
    DividerModule,
    DropdownModule,
    FormsModule,
    FileUploadModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    MenuModule,
    MenubarModule,
    MultiSelectModule,
    PasswordModule,
    PanelModule,
    RatingModule,
    SelectButtonModule,
    SharedModule,
    SliderModule,
    StepsModule,
    TabViewModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    DialogModule,
    FieldsetModule,
    VirtualScrollerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
