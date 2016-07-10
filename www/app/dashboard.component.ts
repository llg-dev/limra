import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageComponent } from './language.component';
import { TopicsComponent } from './topics.component';
import { Topic } from './model/topic';
import { Language } from './model/language';

@Component({
  selector: 'dashboard',
 	templateUrl: 'app/dashboard.component.html',
	styleUrls: ['app/dashboard.component.css'],
	directives: [LanguageComponent, TopicsComponent]
})

export class DashboardComponent implements OnInit
{
	title: string;
	currentLanguage: Language;
	langActive: boolean;

	constructor(
		private router: Router)
  {
    this.langActive = false;
  }


	// init; check local storage to find out if we already chose a language
	ngOnInit()
	{
    console.log('dashboard init');

		var storage = window.localStorage;
		if(storage.getItem("LIMRA_Lang"))
		{
			this.currentLanguage = JSON.parse(storage.getItem("LIMRA_Lang"));
			if(this.currentLanguage.code)
				this.langActive = true;
		}
    console.log('langActive = ' + this.langActive);
	}

	// event handler from child element to listen for
	// link click events
	onSelected(lang: Language)
	{
		this.currentLanguage = lang;
		this.langActive = true;
	}

	// drop storage and reset to the select lang screen
	changeLang()
	{
		this.langActive = false;
		var storage = window.localStorage;
		if(storage.getItem("LIMRA_Lang"))
			storage.removeItem("LIMRA_Lang");

		return false;
	}
}
