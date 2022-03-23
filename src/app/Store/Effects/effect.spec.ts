import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CoffeeEffects } from './coffee.effects';
import { getCoffees, getCoffeesSuccess } from '../Actions/coffee.action';
import { TestScheduler } from 'rxjs/testing';
import { DataService } from '../../Service/data.service';
import { Coffee } from 'src/app/Models/coffee';

describe('ShowsEffects', () => {
  const initialState = { shows: [] };
  const dataService = jasmine.createSpyObj('dataService', ['getCoffees']);
  let effects: CoffeeEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler!: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoffeeEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: DataService, useValue: dataService },
      ],
    });

    effects = TestBed.inject(CoffeeEffects);
    store = TestBed.inject(MockStore);
    store.setState({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCoffee$', () => {
    it('should handle getCoffee and return a getCoffeesSuccess action', () => {
      const coffees: Array<Coffee> = [];
      const action = getCoffees();
      const outcome = getCoffeesSuccess(coffees);

      testScheduler.run(
        ({
          hot,
          cold,
          expectObservable,
        }: {
          hot: any;
          cold: any;
          expectObservable: any;
        }) => {
          actions = hot('-a', { a: action });
          const response = cold('-b|', { b: coffees });
          dataService.getCoffees.and.returnValue(response);

          expectObservable(effects.loadCoffee$).toBe('--b', { b: outcome });
        }
      );
    });
  });
});
