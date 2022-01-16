import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  @Output()
  readonly switchDarkTheme = new EventEmitter<boolean>()

  isNightModeOn = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchToNightMode = (mode: boolean) => {
    this.isNightModeOn = mode;
    this.switchDarkTheme.emit(mode);
  }
}
