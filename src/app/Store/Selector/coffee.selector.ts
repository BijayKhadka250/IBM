import {  createSelector } from '@ngrx/store';
import { CoffeeState } from '../Reducers/coffee.reducers';
import { Coffee } from '../../Models/coffee';

export const coffeeSelector = createSelector(
  (state: CoffeeState) => state.coffees,
  (coffees: ReadonlyArray<Coffee>) => coffees
);

export const coffeeDetailSelector = createSelector(
  (state: CoffeeState) => state.coffee,
  (coffee: Coffee) => coffee
);
