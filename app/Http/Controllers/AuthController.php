<?php

namespace App\Http\Controllers;

use App\Models\Intern;
use App\Models\Employer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    //Register new user
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:intern,employer',
            'mobile' => 'required|string|max:11',
            'cv' => 'nullable|string|max:255',
            'sex' => ['nullable',Rule::in(['male','female'])],
            'birth_date' => 'nullable|date',
            'company_name' => 'nullable|string|max:255',
            'company_address' => 'nullable|string|max:255',
            'company_website' => 'nullable|string|max:255',
            'company_email' => 'nullable|string|email|max:255',
            'company_phone' => 'nullable|string|max:11',
            'company_logo' => 'nullable|string|max:255'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'mobile' => $request->mobile
        ]);

        if ($user->role == 'intern') {
            Intern::create([
                'user_id' => $user->id
            ]);
        }
        if ($user->role == 'employer'){
            Employer::create([
                'user_id' => $user->id
            ]);
        }

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    //login user
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember' => 'boolean',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($request->email, ['remember_me' => $request->remember])->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    //logout user
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully'], 200);
    }
}
