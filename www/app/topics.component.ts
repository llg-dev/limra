import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from './service/topic.service';
import { Topic } from './model/topic';
import { Language } from './model/language';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'topics-values',
 	templateUrl: 'app/topics.component.html',
	styles: [` .evenItem { background-color: #ACACAC; } .oddItem { background-color: #EFEFEF; }`]
})

export class TopicsComponent implements OnInit
{
	@Input() currentLanguage: Language;
  topics$: Observable<Topic[]>;
	error: any;

  constructor(
    	private router: Router,
		  private topicService: TopicService)  { }

	ngOnInit()
	{
    this.topics$ = this.topicService.topics$; // subscribe to entire collection (in language)
    this.topicService.loadInLanguage(this.currentLanguage);    // load topics for language
    // console.log(this.topics$);
	}

}
