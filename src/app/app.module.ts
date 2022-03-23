import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  coffeeReducer,
  selectedCoffeeReducer,
} from './Store/Reducers/coffee.reducers';
import { CoffeeEffects } from './Store/Effects/coffee.effects';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeTable } from './Table/app.table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeDetail } from './Detail/coffee.detail';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

export const appRoutes: Routes = [
  { path: '', component: CoffeeTable },
  { path: 'coffee/:id', component: CoffeeDetail },
];

@NgModule({
  declarations: [AppComponent, CoffeeTable, CoffeeDetail],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    StoreModule.forRoot({
      coffees: coffeeReducer,
      coffee: selectedCoffeeReducer,
    }),
    EffectsModule.forRoot([CoffeeEffects]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
