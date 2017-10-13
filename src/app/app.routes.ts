import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ListComponent } from './list/list.component';

export const appRoutes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'list/:tag', component: ListComponent},
  {path: 'post/:name', component: ContentComponent},
  {path: '**', redirectTo: 'list'},
];
