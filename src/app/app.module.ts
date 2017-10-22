import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { ListComponent } from './list/list.component';
import { appRoutes } from './app.routes';
import { MarkdownModule } from '../markdown/markdown.module';
import { DisqusModule } from 'ngx-disqus';
import { config } from '../config';
import * as Raven from 'raven-js';

Raven
  .config('https://481cf86d8cd24bdd903031598d36cce4@sentry.io/232119')
  .install();


export class RavenErrorHandler implements ErrorHandler {
  handleError (err: any): void {
    Raven.captureException(err);
  }
}

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
  providers: [
    {provide: ErrorHandler, useClass: RavenErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
