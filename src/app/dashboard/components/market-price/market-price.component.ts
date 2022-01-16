import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MarketPriceService } from '../../services/market-price.service';
import { coin } from '../../types/coins.types';
import { marketPrice } from '../../types/market-price.type';
import { maxBy, meanBy, minBy } from 'lodash'

@Component({
  selector: 'app-market-price',
  templateUrl: './market-price.component.html',
  styleUrls: ['./market-price.component.scss'],
  providers: [MarketPriceService]
})
export class MarketPriceComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<marketPrice>;

  coin!: coin;
  coinMarkets!: marketPrice[];
  @Input() selectedFiat!: string;

    min!: string;
    max!: string;
    avg!: string;

  @Input()
  set coinData(coin: coin) {
    if (coin) {
      this.coin = coin;
      this.getMarkets(coin.id);
    }
  }

  displayedColumn = ['exchange', 'pair', 'pairPrice', 'volume'];

  constructor(
    private readonly marketPriceService: MarketPriceService
  ) { }

  ngOnInit(): void {
  }

  getMarkets = (coinName: string): void => {
    this.marketPriceService.getMarkets(coinName).subscribe(coinMarkets => {
      this.coinMarkets = coinMarkets;
      this.table.dataSource = coinMarkets;
      this.defineCoinVariables();
    });
  }

  defineCoinVariables = (): void => {
    this.max = maxBy(this.coinMarkets, 'price')?.price as unknown as string;
    this.min = minBy(this.coinMarkets, 'price')?.price as unknown as string;
    this.avg = meanBy(this.coinMarkets, 'price') as unknown as string;

  }

}
