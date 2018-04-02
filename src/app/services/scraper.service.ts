import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {URL} from '../../config';
import {catchError, map, tap} from 'rxjs/operators';
import index from '@angular/cli/lib/cli';

import {Flow} from '../models/flow';
import {flowsNames} from '../models/flowsNames';
import {Article} from '../models/article';
import {PageArrow} from '../models/pageArrow';

@Injectable()
export class ScraperService {

  private data: any;

  constructor(private http: HttpClient) { }

  getFlows() {
    return this.http.get(URL.url + '/', {responseType: 'text' })
      .pipe(
        tap(resp => console.log('flows ok'))
      );
  }

  getFlowsContent(flowURL: string) {
    return this.http.get(URL.url + flowURL, {responseType: 'text'})
      .pipe(
        tap(resp => console.log('content ok'))
      );
  }

  flowsProcessing(dom) {
    const parser = new DOMParser();
    const siteDOM = parser.parseFromString(dom, 'text/html');
    const flowsTitles = Array.from(siteDOM.getElementsByClassName('stacked-menu__item-text'));
    const flowCounters = Array.from(siteDOM.getElementsByClassName('stacked-menu__item-counter'));
    const result = [];
    flowsTitles.forEach( (el, i) => {
      console.log(el);
      console.log(flowCounters[i]);
      if (typeof flowCounters[i] !== 'undefined') {
        result.push(new Flow(el.innerHTML, + flowCounters[i].innerHTML,
                            flowsNames[el.innerHTML]));
      }
    });
    return result;
  }

  flowContentProcessing(dom) {
    const parser = new DOMParser();
    const siteDOM = parser.parseFromString(dom, 'text/html');
    const flowContent = Array.from(siteDOM.getElementsByClassName('post_preview'));
    console.log(flowContent);
    let result = [];
    let pager;
    flowContent.forEach(el => {
      result.push(new Article(el.children[1].children[0].innerHTML, el.children[4].children[1].getAttribute('href')));
    });
    if (siteDOM.getElementById('previous_page') && siteDOM.getElementById('next_page')) {
      console.log(siteDOM.getElementById('previous_page'));
      pager = new PageArrow(siteDOM.getElementById('previous_page').getAttribute('href'),
                            siteDOM.getElementById('next_page').getAttribute('href'));
    } else {
      const prevPage = (siteDOM.getElementById('previous_page')) ? siteDOM.getElementById('previous_page').getAttribute('href') : '';
      const nextPage = (siteDOM.getElementById('next_page')) ? siteDOM.getElementById('next_page').getAttribute('href') : '';
      console.log(prevPage, nextPage);
      pager = new PageArrow(prevPage, nextPage);
    }
    // const pages = new PageArrow();
    return [result, pager];
  }

}
