<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return view('auth.login');
    }
    public function store(LoginRequest $request): RedirectResponse
    {
        // Validate login request
        $request->authenticate();

        $request->session()->regenerate();

        return Redirect::intended('/dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(): RedirectResponse
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return Redirect::to('/');
    }
}
