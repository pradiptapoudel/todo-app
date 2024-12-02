<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;

class SendWelcomeEmail{ 
    function handle($request, Closure $next)
    {
        $response = $next($request);

        if (auth()->check()) {
            Mail::to(auth()->user()->email)->send(new WelcomeMail(auth()->user()));
        }

        return $response;
    }
}