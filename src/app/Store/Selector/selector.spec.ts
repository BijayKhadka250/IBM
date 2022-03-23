import { Coffee } from 'src/app/Models/coffee';
import * as fromSelectors from './coffee.selector';

describe('coffeeSelector', () => {
  it('should select all Coffees', () => {
    const initialState: Array<Coffee> = [
      {
        id: 1,
        uid: 'A1',
        blend_name: 'coffee',
        origin: 'Nepal',
        variety: 'black',
        notes: 'good for health',
        intensifier: 'intensifier',
      },
      {
        id: 2,
        uid: 'A1',
        blend_name: 'coffee',
        origin: 'Nepal',
        variety: 'black',
        notes: 'good for health',
        intensifier: 'intensifier',
      },
    ];
    const result = fromSelectors.coffeeSelector.projector(initialState);
    expect(result.length).toEqual(2);
  });
});

describe('coffeeDetailSelector', () => {
  it('should get property from a selected coffee', () => {
    const initialState: Coffee = {
      id: 1,
      uid: 'A1',
      blend_name: 'coffee',
      origin: 'Nepal',
      variety: 'black',
      notes: 'good for health',
      intensifier: 'intensifier',
    };

    const result = fromSelectors.coffeeDetailSelector.projector(initialState);
    expect(result.blend_name).toEqual('coffee');
  });
});
