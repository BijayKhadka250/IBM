import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CoffeeTable } from '../Table/app.table';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../app.module';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CoffeeState } from '../Store/Reducers/coffee.reducers';
import { getSelectedCoffee } from '../Store/Actions/coffee.action';
import { AppComponent } from '../app.component';
import { CoffeeDetail } from '../Detail/coffee.detail';
import { coffeeSelector } from '../Store/Selector/coffee.selector';
import { By } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('App Table Component', () => {
  let fixture: ComponentFixture<CoffeeTable>;
  let component: CoffeeTable;
  let store: MockStore<CoffeeState>;
  let location: Location;
  let router: Router;
  const initialState = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, CoffeeTable, CoffeeDetail],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes(appRoutes),
      ],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CoffeeTable);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    let mockShowsSelector;
    mockShowsSelector = store.overrideSelector(coffeeSelector, [
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
    ]);

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
    router.initialNavigation();
  });

  it('should render app table component', () => {
    expect(component).toBeTruthy;
  });

  it('handleClick should dispatch getSelectedCoffee', async(() => {
    let data = {
      id: 1,
      uid: 'A1',
      blend_name: 'coffee',
      origin: 'Nepal',
      variety: 'black',
      notes: 'good for health',
      intensifier: 'intensifier',
    };
    component.handleClick(data);
    expect(store.dispatch).toHaveBeenCalledWith(getSelectedCoffee(data));
  }));

  it('should render all coffees', () => {
    expect(fixture.debugElement.queryAll(By.css('.mat-row')).length).toBe(2);
  });

  it(`handle click should route to '/coffee/:id' route`, fakeAsync(() => {
    fixture.detectChanges();
    let row = fixture.debugElement.queryAll(By.css('.mat-row'));
    row[0].nativeElement.click();
    tick();
    expect(location.path()).toBe('/coffee/1');
  }));

  it('should render coffee according to pageSize', () => {
    let data = {
      pageIndex: 0,
      pageSize: 1,
    };
    component.onPageChange(data);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('.mat-row')).length).toBe(1);
    });
  });
});
