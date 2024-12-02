<?php

return [
    'paths' => ['api/tasks'], // Allow all API routes
    'allowed_methods' => ['*'], // Allow all HTTP methods
    'allowed_origins' => ['http://127.0.0.1:5501'], // Your frontend origin
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
    'paths' => ['api/*', 'sanctum/csrf-cookie']
];
