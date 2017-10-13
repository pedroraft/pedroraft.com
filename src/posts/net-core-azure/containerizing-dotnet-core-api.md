
In case you never heard of docker before: [what is docker](https://www.docker.com/what-container)
>A container image is a lightweight, stand-alone, executable package of a piece of software that includes everything needed to run it: code, runtime, system tools, system libraries, settings. Available for both Linux and Windows based apps, containerized software will always run the same, regardless of the environment. Containers isolate software from its surroundings, for example differences between development and staging environments and help reduce conflicts between teams running different software on the same infrastructure.

## The Api:

[The tutorial for the api](/post/simple-todo-api-net-core), if you want you can skip this step and download the repository (TODO: ADD THE REPO HERE) in this tutorial we will use this repository application as an example. It's a simple todo api.
I'll use [postman](https://www.getpostman.com/) to communicate with the api:
```bash
dotnet restore && dotnet run
```

```text
Images and url from api with postman
```

## Summary:  
### Cooking docker image:
  * Creating Dockerfile
  * Building application
  * Building Docker image
  * Upload Image to docker hub

  
## Creating Dockerfile:
```yml
# Use the standard Microsoft .NET Core container
FROM microsoft/dotnet

# Copy our published code from the “/app” folder to the “/app” folder in our container
WORKDIR /app
COPY /app /app

# Expose port 5000 for the Web API traffic
EXPOSE 5000

# Restore the necessary packages
# Build and run the dotnet application from within the container
ENTRYPOINT dotnet api-simple-todo.dll
```

## Building the application:
Building aplication so we can insert it in the docker image
```bash
dotnet publish -c Release -o app
```
-o it's the destination folder.

## Building the docker image:
Build the docker image from Dockerfile using the recently builded application
```bash
docker build –t api-simple-todo .
```
-t it's the target

## Runing docker image:
Let's test the image localy
```bash
docker run -d -p 5000:5000 api-simple-todo
```
-p publish to host
 
-d detach container from terminal

And it's done, but if we try to use the api right now we will se the following error:
````text
TODO: ERROR IMAGE
````
Add this line in Program.cs
````csharp
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls(“http://*:5000") //Add this line of code.
                .Build();
    }
````
This tell kestrel (the net core webserver) to listen at any address in that port and protocol.
**Now re-do last 3 steps to update our image**
## Upload Image to docker hub
Now we upload our image to docker hub so we can retrive it in azure.
If you want to skip this step use this docker image on the next step
````bash
docker login
docker tag image-id image-tag
docker tag image-id your-user/api-simple-todo
docker push your-user/api-simple-todo
````
````text
TODO: IMAGE TERMINAL AND DOCKER SITE
````
