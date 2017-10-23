> Note this will not work in a subpath ie: example.com/subpath/yourApp

Go to your iis root and make two folders. This will make it easier to deploy this application later.
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

The iis prints are in portuguese but everything should be in the same place on any language.
<div style="text-align:center;">
  <img src="/posts/random/img/Screenshot_1.png" alt="folder">
  <img src="/posts/random/img/iis1.png" alt="iis">
</div>

Now the Angular application goto basic config and change the physical path to /www


<div style="text-align:center;">
  <img src="/posts/random/img/Screenshot_2.png" alt="folder" style="max-height:400px;">
  <img src="/posts/random/img/iis2.png" alt="iis" style="max-height:400px;max-width:70%;">
</div>

Application will work but routes will give an error, a conflict between iis and angular router, Solution is to use HashLocationStrategy, this puts a hash before angular routes, ie: example.com/#/login

````typescript
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}], // here, this line
  bootstrap: [AppComponent]
})
export class AppModule {}
````
