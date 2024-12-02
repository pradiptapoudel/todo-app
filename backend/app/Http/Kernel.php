<?php
$middlewareGroups = [
    'api' => [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        \Illuminate\Routing\Middleware\ThrottleRequests::class . ':api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \Fruitcake\Cors\HandleCors::class, // Ensure this is here
    ],
    'web' => [
        \Laravel\Sanctum\Http\Middleware\VerifyCsrfToken::class,
    ],
];
