### This is a short version of [this microsoft tutorial](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api), next post is going to be about hosting this application in azure with a docker container controlled by kubernetes.

We will be creating a todo list api, a basic crud.
Install [dotnet core](https://www.microsoft.com/net/core) on your os, i also recomend using [vscode](https://code.visualstudio.com/Download), and [postman](https://www.getpostman.com/) for api navigation.

The application will store data in memory for demonstration purposes, no database installation required. Bootstrap the application with the following commands: 

```bash
mkdir api-simple-todo
cd api-simple-todo
dotnet new webapi
mkdir Models
```
Now we create the model, POCO (Plain old csharp object) class that represents the database table.

/Models/TodoModel.cs
```csharp
namespace api_simple_todo.Model
{
    public class TodoModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
```
Now the Context, this is the database representation.

/Models/TodoContext.cs
```csharp
using Microsoft.EntityFrameworkCore;

namespace api_simple_todo.Model
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoModel> TodoItems { get; set; }
        // here you add other models
    }
}
```
In your *Startup.cs* add this line to connect to the database (this case in memory).
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc();
    // the line bellow 
    services.AddDbContext<TodoContext>(optionsAction: opt => opt.UseInMemoryDatabase("todo"));
}
```

Finally the controller, this is very similar to older dot net versions web api controllers:
```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using api_simple_todo.Model;

namespace api_simple_todo.Controllers
{
    // this tells what url the controller will be, in this case /api/todo
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;

            // add a todo if database is empty
            if (_context.TodoItems.Count() == 0)
            {
                _context.TodoItems.Add(new TodoModel { Name = "Item1" });
                _context.SaveChanges();
            }
        }
        
        // get all todo
        // GET:/api/todo/
        public IEnumerable<TodoModel> GetAll()
        {
            return _context.TodoItems.ToList();
        }
    }
}
```
![postman](/assets/markdown/img/Screenshot from 2017-08-21 22-05-41.png "Postman")

Add a method in the controller to get a single item by its id.
```csharp
[HttpGet("{id}", Name = "GetTodo")]
public IActionResult GetById(long id)
{
    var item = _context.TodoItems.FirstOrDefault(t => t.Id == id);
    if (item == null)
    {
        return NotFound();
    }
    return new ObjectResult(item);
}
```
![postman](/assets/markdown/img/Screenshot from 2017-08-21 22-02-16.png "Postman")

Method to create an item.
```csharp
[HttpPost]
public IActionResult Create( TodoModel item)
{
    if (item == null)
    {
        return BadRequest();
    }

    _context.TodoItems.Add(item);
    _context.SaveChanges();

    return CreatedAtRoute("GetTodo", new { id = item.Id }, item);
}
```
![postman](/assets/markdown/img/Screenshot from 2017-08-21 21-50-22.png "Postman")

Most complex method, the update.
```csharp
[HttpPut("{id}")]
public IActionResult Update(long id, TodoModel item)
{
    if (item == null || item.Id != id)
    {
        return BadRequest();
    }

    // Get the item according to its id
    var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
    if (todo == null)
    {
        return NotFound();
    }

    // note the lack of the id
    todo.IsComplete = item.IsComplete;
    todo.Name = item.Name;

    // update & save the item
    _context.TodoItems.Update(todo);
    _context.SaveChanges();
    return new NoContentResult();
}
```
![postman](/assets/markdown/img/Screenshot from 2017-08-21 22-05-24.png "Postman")

Delete an item
```csharp
[HttpDelete("{id}")]
public IActionResult Delete(long id)
{
    // Get the item according to its id    
    var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
    if (todo == null)
    {
        return NotFound();
    }

    // remove & save the item    
    _context.TodoItems.Remove(todo);
    _context.SaveChanges();
    return new NoContentResult();
}
```
![postman](/assets/markdown/img/Screenshot from 2017-08-21 22-12-06.png "Postman")
---
This is the next guide: [Hosting net core api in azure with kubernetes cluster docker container](/post/hosting-net-core-api-azure-kubernetes-cluster)