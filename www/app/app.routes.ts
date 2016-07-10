import { provideRouter, RouterConfig } from '@angular/router';
import { LanguageComponent } from './languages/language.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: RouterConfig = [
	{
		path: 'language/:code',
		component: DashboardComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: '**',
		redirectTo: '/dashboard'
	}
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
