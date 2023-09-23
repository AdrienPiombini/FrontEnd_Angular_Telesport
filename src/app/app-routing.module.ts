import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsOlympicComponent } from './pages/details-olympic/details-olympic.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '*', // wildcard
    component: NotFoundComponent,
  },
  {
    path:'details',
    component:DetailsOlympicComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
