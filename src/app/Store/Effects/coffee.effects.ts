import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { getCoffees } from '../Actions/coffee.action';
import { DataService } from 'src/app/Service/data.service';
import { EMPTY } from 'rxjs';
import { getCoffeesSuccess } from '../Actions/coffee.action';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';

@Injectable()
export class CoffeeEffects {
  loadCoffee$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCoffees),
      exhaustMap(() =>
        this.dataService.getCoffees().pipe(
          map((coffees) => {
            return getCoffeesSuccess(coffees);
          }),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  constructor(private action$: Actions, private dataService: DataService) {}
}
