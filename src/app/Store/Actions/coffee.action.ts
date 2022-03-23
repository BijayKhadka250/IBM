import { createAction } from '@ngrx/store';
import { Coffee } from '../../Models/coffee'

export const getCoffees = createAction('[Coffee] Get coffee');

export const getCoffeesSuccess = createAction(
    '[Coffee] Get coffee success',
    (coffees: ReadonlyArray<Coffee>) => ({ coffees })
    // props<{ movies: ReadonlyArray<Movie> }>()
  );

  export const getSelectedCoffee = createAction(
    '[Coffee] Get selected coffee',
    (coffee: Coffee) => ({ coffee })
    // props<{ movies: ReadonlyArray<Movie> }>()
  );