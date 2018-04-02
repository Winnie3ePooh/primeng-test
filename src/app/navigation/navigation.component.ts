import { Component, OnInit } from '@angular/core';
import {ScraperService} from '../services/scraper.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  test: any[];
  loading = true;

  constructor(private scraper: ScraperService) { }

  ngOnInit() {
    this.getFlowsList();
  }

  getFlowsList() {
    this.scraper.getFlows().subscribe(resp => {
      this.test = this.scraper.flowsProcessing(resp).filter(el => el.counter > 2);
      this.loading = false;
    });
  }
}
