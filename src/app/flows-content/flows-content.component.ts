import {Component, Input, OnInit} from '@angular/core';
import {ScraperService} from '../services/scraper.service';
import {Article} from '../models/article';
import {PageArrow} from '../models/pageArrow';

@Component({
  selector: 'app-flows-content',
  templateUrl: './flows-content.component.html',
  styleUrls: ['./flows-content.component.css']
})
export class FlowsContentComponent implements OnInit {

  @Input() tabURL: string;
  articles: Article[];
  pager: PageArrow;
  loading = true;

  constructor(private scraper: ScraperService) { }

  ngOnInit() {
    this.getContent();
  }

  getContent(url: string = this.tabURL) {
    this.scraper.getFlowsContent(url).subscribe(resp => {
      [this.articles, this.pager] = this.scraper.flowContentProcessing(resp);
      this.loading = false;
    });
  }

  changePage(page: string) {
    this.loading = true;
    this.getContent(page);
  }

}
