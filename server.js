var http = require("http");
var fs = require("fs");

function send404Response(response)
{
	response.writeHead(404, {"Context-Type": "Text/plain"});
	response.write("Error 404: Page not found!");
	response.end();
	
}

function onRequest(request, response)
{
	console.log("Request: " + request.connection.remoteAddress);

	if (request.method == "GET" && (request.url == "/" || request.url == "/index.html")) 
	{
		response.writeHead(200, {"Context-Type": "Text/plain"})
		fs.createReadStream("./index.html").pipe(response);
	} else {
		send404Response(response);
		console.log("Cannot find requested page: " + request.url);
	}
}

http.createServer(onRequest).listen(3000);
console.log("Server is now running...");