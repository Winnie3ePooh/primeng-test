import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {TabViewModule} from 'primeng/tabview';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import { AppComponent } from './app.component';
import { FlowsContentComponent } from './flows-content/flows-content.component';
import {ScraperService} from './services/scraper.service';
import {HttpClientModule} from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { LoadingAnimationComponent } from './loading-animation/loading-animation.component';


@NgModule({
  declarations: [
    AppComponent,
    FlowsContentComponent,
    NavigationComponent,
    LoadingAnimationComponent
  ],
  imports: [
    BrowserModule,
    TabViewModule,
    DataViewModule,
    ButtonModule,
    CardModule,
    HttpClientModule
  ],
  providers: [ScraperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
