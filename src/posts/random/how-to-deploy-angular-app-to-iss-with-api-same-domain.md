> Note this will not work in a subpath ie: example.com/subpath/yourApp

Go to your iis root and make two folders. This will make it easier to deploy this application in the future.
````text
mkdir api
mkdir www
````

Deploy the application publish inside the /api folder and convert to application.
note: if your controllers route use routeTemplate: "api/{controller}/{id}", the location will be example/api/api/, to solve this just remove the api part in WebApiConfig.cs
````csharp
config.Routes.MapHttpRoute(
    name: "DefaultApi",
    routeTemplate: "{controller}/{id}",
    defaults: new { id = RouteParameter.Optional }
);
````

![folder](/assets/markdown/img/Screenshot_1.png "folder")![iis](/assets/markdown/img/iis1.png "iis")



Now the Angular application goto basic config and change the physical path to /www

![folder](/assets/markdown/img/Screenshot_2.png "folder")![iis](/assets/markdown/img/iis2.png "iis")

Application will work but routes will give an error, a conflict between iis and angular router, Solution is to use HashLocationStrategy, this puts a hash before angular routes, ie: example.com/#/login

````typescript
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    NgbModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}], // here, this line
  bootstrap: [AppComponent]
})
export class AppModule {}
````
