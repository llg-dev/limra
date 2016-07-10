import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Topic } from './topic';
import { Language } from '../languages/language';


import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TopicService
{
	private url: string = 'app/topics';  // URL to web api
	private _topics$: Subject<Topic[]>;
	private dataStore:
	{
		topics: Topic[];
	}

	constructor(private http: Http)
	{
		this._topics$ = <Subject<Topic[]>> new Subject();
		this.dataStore = { topics: [] };
	}

	get topics$() {
	    return this._topics$.asObservable();
			// console.log(this._topics$);
	}

	// loadAll(language: Language) {
  //   this.http.get(`${this.url + language.code}`)
	// 		.map(response => response.json())
	// 		.map(res => res.data)
	// 		.subscribe(data => {
  //     	this.dataStore.topics = data;
  //     	this._topics$.next(this.dataStore.topics);
	// 			console.log(this.dataStore.topics);
  //   	},
	// 		error => this.handleError(error));
  // }

	loadInLanguage(language: Language) {
	  this.http.get(`${this.url}`)
			.map(response => response.json())
			.map(res => res.data)
			.subscribe(data => {
				this.dataStore.topics = []; //clear previous language (in case it changed)
				data.forEach((topic: Topic) => {
					if(topic.langCode === language.code){
						this.dataStore.topics.push(topic)
					}
				})
	    	// this.dataStore.topics = data;
	    	this._topics$.next(this.dataStore.topics);
				console.log(this.dataStore.topics);
	  	},
			error => this.handleError(error));
	}

	private handleError(error: any)
	{
		console.error('Could not load topics.', error);
		// return Promise.reject(error.message || error);
		// return Observer.reject(error.message || error);
	}


}
