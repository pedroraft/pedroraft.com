import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { ListComponent } from './list/list.component';
import { appRoutes } from './app.routes';
import { MarkdownModule } from '../markdown/markdown.module';
import { DisqusModule } from 'ngx-disqus';
import { config } from '../config';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    DisqusModule.forRoot(config.disqusName)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
