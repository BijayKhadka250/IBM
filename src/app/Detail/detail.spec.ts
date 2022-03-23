import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CoffeeDetail } from '../Detail/coffee.detail';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../app.module';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CoffeeState } from '../Store/Reducers/coffee.reducers';
import { AppComponent } from '../app.component';
import { coffeeDetailSelector } from '../Store/Selector/coffee.selector';
import { By } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoffeeTable } from '../Table/app.table';

describe('Coffee Detail Component', () => {
  let fixture: ComponentFixture<CoffeeDetail>;
  let component: CoffeeDetail;
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
    fixture = TestBed.createComponent(CoffeeDetail);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    let mockShowsSelector;
    mockShowsSelector = store.overrideSelector(coffeeDetailSelector, {
      id: 1,
      uid: 'A1',
      blend_name: 'coffee',
      origin: 'Nepal',
      variety: 'black',
      notes: 'good for health',
      intensifier: 'intensifier',
    });

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
    router.initialNavigation();
  });

  it('should render coffee detail component', () => {
    expect(component).toBeTruthy;
  });

  it('should render coffee-detail class ', () => {
    expect(fixture.debugElement.queryAll(By.css('.coffee-detail')).length).toBe(
      1
    );
  });

  it(`click the back button should route to '/' route`, fakeAsync(() => {
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.back-icon'));
    button.nativeElement.click();
    tick();
    expect(location.path()).toBe('/');
  }));
});
