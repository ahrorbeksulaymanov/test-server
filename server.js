const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005;

// Allowed IP address
const ALLOWED_IP = process.env.ALLOWED_IP || '185.213.229.23';

// Custom middleware to check IP and set CORS headers
app.use((req, res, next) => {
  // Get client IP address
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   req.ip;
  
  // Remove IPv6 prefix if present
  const cleanIP = clientIP.replace(/^::ffff:/, '');
  
  // Check if IP is allowed
  if (cleanIP === ALLOWED_IP || cleanIP === '127.0.0.1' || cleanIP === '::1') {
    // Set CORS headers for allowed IP
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    
    next();
  } else {
    // Block request from non-allowed IP
    res.status(403).json({ 
      error: 'Forbidden', 
      message: 'Access denied. Your IP is not allowed.',
      yourIP: cleanIP,
      allowedIP: ALLOWED_IP
    });
  }
});

// Middleware to log requests
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   req.ip;
  const cleanIP = clientIP.replace(/^::ffff:/, '');
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${cleanIP}`);
  next();
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET endpoint - returns string
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running successfully!', success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS is configured to allow only IP: ${ALLOWED_IP}`);
  console.log(`Access the server at http://localhost:${PORT}`);
});

