import { Coffee } from 'src/app/Models/coffee';
import { getCoffeesSuccess, getSelectedCoffee } from '../Actions/coffee.action';
import * as fromReducer from './coffee.reducers';

describe('coffeeReducer', () => {
  describe('unknown action on Coffee Reducer', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.coffeeReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });
});

describe('getCoffeesSuccess action', () => {
  it('should update the state in an immutable way', () => {
    const { initialState } = fromReducer;
    const newState: ReadonlyArray<Coffee> = [
      {
        id: 1,
        uid: 'A1',
        blend_name: 'coffee',
        origin: 'Nepal',
        variety: 'black',
        notes: 'good for health',
        intensifier: 'intensifier',
      },
    ];
    const action = getCoffeesSuccess(newState);
    const state = fromReducer.coffeeReducer(initialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});

describe('getSelectedCoffee action', () => {
  it('should update the state in an immutable way', () => {
    const { initialSelectedCoffee } = fromReducer;
    const newState: Coffee = {
      id: 1,
      uid: 'A1',
      blend_name: 'coffee',
      origin: 'Nepal',
      variety: 'black',
      notes: 'good for health',
      intensifier: 'intensifier',
    };

    const action = getSelectedCoffee(newState);
    const state = fromReducer.selectedCoffeeReducer(
      initialSelectedCoffee,
      action
    );

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});

describe('selectedCoffeeReducer', () => {
  describe('unknown action on Coffee Selected Reducer', () => {
    it('should return the default state', () => {
      const { initialSelectedCoffee } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.selectedCoffeeReducer(
        initialSelectedCoffee,
        action
      );

      expect(state).toBe(initialSelectedCoffee);
    });
  });
});
