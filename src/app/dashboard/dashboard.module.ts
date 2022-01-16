import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { AvgPricesListComponent } from './components/avg-prices-list/avg-prices-list.component';
import { NumberFormatPipe } from '../shared/pipes/number-format.pipe';
import { MarketPriceComponent } from './components/market-price/market-price.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AvgPricesListComponent,
    NumberFormatPipe,
    MarketPriceComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    FormsModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [DecimalPipe]
})
export class DashboardModule { }
