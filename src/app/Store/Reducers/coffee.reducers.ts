import {
  createReducer,
  on,
} from '@ngrx/store';
import { Coffee } from '../../Models/coffee';
import { getCoffeesSuccess, getSelectedCoffee } from '../Actions/coffee.action';

export interface CoffeeState {
  coffees: ReadonlyArray<Coffee>;
  coffee: Readonly<Coffee>;
}

export const initialState: ReadonlyArray<Coffee> = [];

export const coffeeReducer = createReducer(
  initialState,
  on(getCoffeesSuccess, (state, { coffees }) => {
    return [...coffees];
  })
);

export const initialSelectedCoffee = {};
export const selectedCoffeeReducer = createReducer(
  initialSelectedCoffee,
  on(getSelectedCoffee, (state, { coffee }) => {
    return { ...coffee };
  })
);
