import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CoffeeState } from '../Store/Reducers/coffee.reducers';
import { coffeeSelector } from '../Store/Selector/coffee.selector';
import { Router } from '@angular/router';
import { getSelectedCoffee } from '../Store/Actions/coffee.action';
import { AppService } from '../app.services';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['app.table.css'],
  templateUrl: 'app.table.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeeTable {
  constructor(
    private store: Store<CoffeeState>,
    private router: Router,
    private appService: AppService,
    private cf: ChangeDetectorRef
  ) {
    this.appService.titleUpdate.emit('COFFEE LISTS');
  }

  displayedColumns: string[] = ['id', 'blend_name', 'intensifier', 'origin'];
  dataSource: any;
  length!: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 20];

  onPageChange(event: any) {
    let start = event.pageIndex * event.pageSize;
    let end = event.pageIndex * event.pageSize + event.pageSize;
    this.store.select(coffeeSelector).subscribe((data) => {
      this.dataSource = data.slice(start, end);
    });
  }

  handleClick(event: any) {
    this.store.dispatch(getSelectedCoffee(event));
    this.router.navigate([`/coffee/${event.id}`]);
  }

  ngOnInit() {
    this.store.select(coffeeSelector).subscribe((data) => {
      this.dataSource = data.slice(0, this.pageSize);
      this.length = data.length;
      this.cf.markForCheck();
    });
  }
}
