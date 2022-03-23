import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Coffee } from './Models/coffee';
import { getCoffees } from './Store/Actions/coffee.action';
import { CoffeeState } from './Store/Reducers/coffee.reducers';
import { coffeeSelector } from './Store/Selector/coffee.selector';
import { Router } from '@angular/router';
import { AppService } from './app.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'ibm-code-challenge';
  coffees = this.store.select(coffeeSelector);
  pageTitle = 'COFFEE LISTS';

  constructor(
    private store: Store<CoffeeState>,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    console.log('app component');

    this.router.navigate(['']);
    this.getAllCoffee();
    this.appService.titleUpdate.subscribe((data) => {
      this.pageTitle = data;
    });
  }

  getAllCoffee(): void {
    this.store.dispatch(getCoffees());
  }
}
