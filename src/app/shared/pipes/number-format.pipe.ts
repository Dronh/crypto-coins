import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  constructor() {
  }

  transform(value: number) {
    if (value === null) return null;
    if (value === 0) return "0";
    let fractionSize = 1;
    let abs = Math.abs(value);
    let rounder = Math.pow(10, fractionSize);
    let isNegative = value < 0;
    let key = '';
    let powers = [{ key: "q", value: Math.pow(10, 15) }, { key: "t", value: Math.pow(10, 12) }, { key: "b", value: Math.pow(10, 9) }, { key: "m", value: Math.pow(10, 6) }, { key: "k", value: 1000 }];
    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key;
  }

}
