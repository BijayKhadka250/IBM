import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '../app.services';
import { Coffee } from '../Models/coffee';
import { CoffeeState } from '../Store/Reducers/coffee.reducers';
import { coffeeDetailSelector } from '../Store/Selector/coffee.selector';
@Component({
  selector: 'coffee-detail',
  styleUrls: ['coffee.detail.css'],
  templateUrl: 'coffee.detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeeDetail {
  constructor(
    private router: Router,
    private store: Store<CoffeeState>,
    private appService: AppService
  ) {
    this.appService.titleUpdate.emit('COFFEE DETAIL');
  }
  coffeeDetail = {};

  backButtonHandler() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.store.select(coffeeDetailSelector).subscribe((data) => {
      this.coffeeDetail = data;
    });
  }
}
