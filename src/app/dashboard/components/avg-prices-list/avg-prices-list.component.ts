import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CoinsService } from '../../services/coins.service';
import { FiatService } from '../../services/fiat.service';
import { coin } from '../../types/coins.types';
import { fiat } from '../../types/fiat.types';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-avg-prices-list',
  templateUrl: './avg-prices-list.component.html',
  styleUrls: ['./avg-prices-list.component.scss'],
  providers: [FiatService, CoinsService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AvgPricesListComponent implements OnInit {


  @ViewChild(MatTable) table!: MatTable<coin>;

  fiatCurrencies!: fiat[];
  fiatSelected!: fiat;

  columnsToDisplay = ['rank', 'name', 'price', 'marketCap', 'availableSupply', 'priceChange1d', 'actions'];
  expandedElement!: coin | null;

  dataSource!: coin[];


  constructor(
    private readonly fiatService: FiatService,
    private readonly coinsService: CoinsService
  ) { }

  ngOnInit(): void {
    this.getFiats();
  }

  getFiats = (): void => {
    this.fiatService.getFiats().subscribe(fiats => {
      this.fiatCurrencies = fiats;
      this.defaultFiatSelect("INR");
    })
  }

  onFiatSelect = (fiat: fiat): void => {
    this.getCoins(fiat.name);
  }

  defaultFiatSelect = (fiatname: string): void => {
    const deafultFiat = this.fiatCurrencies.find(eachFeat => eachFeat.name === fiatname);
    if (deafultFiat) {
      this.fiatSelected = deafultFiat;
      this.getCoins(deafultFiat.name);
    }
  }

  getCoins = (fiatName: string): void => {
    this.coinsService.getAvgPrices(0, 20, fiatName).subscribe(avgCurrencies => {
      this.dataSource = avgCurrencies.coins;
      this.table.dataSource = avgCurrencies.coins;
    });
  }

  addToFavorites = (coinId: string): void => {
    if (this.checkFavoriteLimit()) {
      const coin = this.findCoinById(coinId);
      if (coin) {
        coin.favorite = true;
        this.table.dataSource = this.dataSource;
      }
    }
  }

  removeFromFavorites = (coinId: string): void => {
    const coin = this.findCoinById(coinId);
    if (coin) {
      coin.favorite = false;
      this.table.dataSource = this.dataSource;
    }
  }

  checkFavoriteLimit = (): boolean => {
    const filteredFavorites = this.dataSource.filter(eachElem => eachElem.favorite === true);
    return filteredFavorites.length < 3;
  }

  findCoinById = (coinId: string): coin | undefined => {
    return this.dataSource.find(eachElement => eachElement.id === coinId);
  }
}
