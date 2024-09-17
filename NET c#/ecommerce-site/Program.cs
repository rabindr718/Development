
var builder = WebApplication.CreateBuilder(args);

internal class WebApplication
{
    internal static object CreateBuilder(string[] args)
    {
        throw new NotImplementedException();
    }
}

// Configure services if needed
// builder.Services.Add...

var app = builder.Build();

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Configure endpoints
app.MapGet("/", () => "Hello, HTTPS!");

app.Run();
