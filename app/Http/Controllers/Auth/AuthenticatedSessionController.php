<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create()
    {
        if (Auth::guard('web')->user()) {
            return redirect()->intended(route("dashboard"));
        } 
        elseif (Auth::guard('hotels')->user()) {
            return redirect()->intended(route("hotel_dashboard"));
        }
         elseif (Auth::guard('staffs')->user()) {
            return redirect()->intended(route("staff_dashboard"));
        }

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // $request->authenticate();

        // $request->session()->regenerate();

        // return redirect()->intended(route('dashboard', absolute: false));

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],    
        ]);

        // 1️ Try ADMIN guard first
        if (Auth::guard('web')->attempt(array_merge($credentials,[
            'status'=>'active'
        ]))) {
            $request->session()->regenerate(); 
            return redirect()->intended(route('dashboard'));
        }

        // 2️ Try USER guard
        if (Auth::guard('hotels')->attempt(array_merge($credentials,[
            'status'=>'active'
        ]))) {
            $request->session()->regenerate();
            return redirect()->intended(route("hotel_dashboard"))->with('reload', true);
            }
            // 3 Staff 
            if (Auth::guard('staffs')->attempt(array_merge($credentials,[
                'status'=>'active'
            ]))) {
            // dd(Auth::guard('staffs')->user());
            $request->session()->regenerate();
            return redirect()->intended(route('staff_dashboard'))->with('reload', true);
            }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->intended(route('login'))->with('reload', true);
    }
    /**
     * Destroy an authenticated session.
     */
    public function hotel_destroy(Request $request): RedirectResponse
    {
        Auth::guard('hotels')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->intended(route('login'))->with('reload', true);
    }
    /**
     * Destroy an authenticated session.
     */
    public function staff_destroy(Request $request): RedirectResponse
    {
        Auth::guard('staffs')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->intended(route('login'))->with('reload', true);
    }
}
