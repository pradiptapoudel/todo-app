<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // You can add other service registrations here if needed
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Load the API routes manually
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->app->getNamespace())
            ->group(base_path('routes/api.php'));
        
        // Optionally, load web routes as well
        Route::middleware('web')
            ->namespace($this->app->getNamespace())
            ->group(base_path('routes/web.php'));
    }
}
