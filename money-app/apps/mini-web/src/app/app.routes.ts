import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { MyExpensesComponent } from './pages/graphs/my-expenses/my-expenses.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { UsersExpensesComponent } from './pages/graphs/users-expenses/users-expenses.component';
import { MyIncomesComponent } from './pages/graphs/my-incomes/my-incomes.component';
import { AboutUserComponent } from './pages/about_user/about_user.component';

export const appRoutes: Route[] = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'graphs', component: GraphsComponent, pathMatch: 'full' },
  { path: 'my-expenses', component: MyExpensesComponent, pathMatch: 'full' },
  { path: 'my-incomes', component: MyIncomesComponent, pathMatch: 'full' },
  { path: 'about-user', component: AboutUserComponent, pathMatch: 'full' },
  {
    path: 'groups',
    component: GroupsComponent,
    pathMatch: 'full',
  },
  {
    path: 'user-expenses',
    component: UsersExpensesComponent,
    pathMatch: 'full',
  },
];
