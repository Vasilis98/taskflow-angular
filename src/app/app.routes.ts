import { Routes } from '@angular/router';
import { HomeComponent} from './pages/home/home.component';
import { AboutComponent} from './pages/about/about.component';
import { TaskDetailsComponent} from './pages/task-details/task-details.component';

export const routes: Routes = [
  { path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'task/:id',
    component: TaskDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
