import http.server
import socketserver
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    ".js": "application/javascript",
});
print(f"Starting server on port {PORT}...")
print(Handler.extensions_map[".js"])
httpd = socketserver.TCPServer(("", PORT), Handler)
httpd.serve_forever()