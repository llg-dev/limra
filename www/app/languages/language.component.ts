import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Language } from './language';

@Component({
  selector: 'language-choice',
 	templateUrl: 'app/languages/language.component.html',
	styleUrls: ['app/languages/language.component.css']
})

export class LanguageComponent implements OnInit
{
	// new event listener to let parent know about changes
	@Output() onSelected = new EventEmitter<Language>();

	sub: any;
  	langList: Language[] = [new Language("en","English"),
	  					new Language("es","Spanish"),
							new Language("pt","Portugese"),
							new Language("jp","Japanese"),
							new Language("kr","Korean"),
							new Language("tc","Traditional Chinese"),
							new Language("sc","Simplified Chinese")];

  	constructor(
      private router: Router,
		  private route: ActivatedRoute) { }

	ngOnInit()
	{
    console.log('language component init');
		this.sub = this.route.params.subscribe(params => {
			let code = params['code'];
      if (code){
        for(var x=0; x < this.langList.length - 1; x++)
  			{
          console.log('in loop code=' + code + ' ' + this.langList[x].code);
  				if(this.langList[x].code == code)
  					this.storeLanguage(this.langList[x]);
  			}
      }
		});
	}

  setLang(lang: Language)
	{
		this.storeLanguage(lang);
		return false;
	}

	// store selection in storage, alert parent of changes
	private storeLanguage(lang: Language)
	{
    console.log('entered storLanguage()');
		if(lang)
		{
			if (typeof(Storage) !== "undefined") {
				// set storage
				var storage = window.localStorage;
				storage.setItem("LIMRA_Lang", JSON.stringify(lang));

				// event to hail parent
				this.onSelected.emit(lang);
			} else {
				// Error handling here
			}
		}
	}

}
