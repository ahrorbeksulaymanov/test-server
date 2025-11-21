# Test Server

Node.js server with CORS restricted to a single IP address.

## Installation

```bash
npm install
```

## Configuration

Set the allowed IP address using environment variable:

```bash
# Windows PowerShell
$env:ALLOWED_IP="192.168.1.100"; node server.js

# Windows CMD
set ALLOWED_IP=192.168.1.100 && node server.js

# Linux/Mac
ALLOWED_IP=192.168.1.100 node server.js
```

Or modify the `ALLOWED_IP` constant in `server.js` directly.

## Running

```bash
npm start
```

The server will run on port 3000 by default. You can change it by setting the `PORT` environment variable.

## Features

- CORS enabled only for the specified IP address
- All other IPs are blocked
- Request logging with IP addresses
- Basic API endpoints included

