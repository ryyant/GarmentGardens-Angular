import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AccordionModule } from 'primeng/accordion';
import { ClipboardModule } from 'ngx-clipboard';
import { KnobModule } from 'primeng/knob';
import { GMapModule } from 'primeng/gmap';
import { SplitterModule } from 'primeng/splitter';

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
import { CreateNewUserComponent } from './systemAdministration/create-new-user/create-new-user.component';
import { ViewProfilePageComponent } from './systemAdministration/view-profile-page/view-profile-page.component';
import { ViewSellerProductsComponent } from './systemAdministration/view-seller-products/view-seller-products.component';
import { ViewAllRewardsComponent } from './systemAdministration/view-all-rewards/view-all-rewards.component';
import { ViewProductByCategoryComponent } from './systemAdministration/view-product-by-category/view-product-by-category.component';
import { ViewRewardDetailsComponent } from './systemAdministration/view-reward-details/view-reward-details.component';
import { ViewMyRewardsComponent } from './systemAdministration/view-my-rewards/view-my-rewards.component';
import { ViewDisputesComponent } from './systemAdministration/view-disputes/view-disputes.component';
import { ConfirmationService } from 'primeng/api';
import { ViewMyCartComponent } from './systemAdministration/view-my-cart/view-my-cart.component';
import { ViewMyTransactionsComponent } from './systemAdministration/view-my-transactions/view-my-transactions.component';
import { SizingAssistantComponent } from './dialogbox/sizing-assistant/sizing-assistant.component';
import { ViewAllRatingsComponent } from './systemAdministration/view-all-ratings/view-all-ratings.component';
import { DonatePageComponent } from './donate-page/donate-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CreateDisputeComponent } from './systemAdministration/create-dispute/create-dispute.component';
import { FlashsalesComponent } from './flashsales/flashsales.component';

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
    CreateNewUserComponent,
    ViewProfilePageComponent,
    ViewSellerProductsComponent,
    ViewAllRewardsComponent,
    ViewProductByCategoryComponent,
    ViewRewardDetailsComponent,
    ViewMyRewardsComponent,
    ViewDisputesComponent,
    ViewMyCartComponent,
    ViewMyTransactionsComponent,
    SizingAssistantComponent,
    ViewAllRatingsComponent,
    DonatePageComponent,
    AboutUsComponent,
    CreateDisputeComponent,
    FlashsalesComponent,
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
    VirtualScrollerModule,
    AccordionModule,
    ClipboardModule,
    KnobModule,
    GMapModule,
    SplitterModule,
  ],
  providers: [ConfirmationService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
