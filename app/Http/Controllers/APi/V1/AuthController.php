<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\RegisterRequest;
use App\Http\Traits\ApiResponseTrait;
use App\Http\Traits\UploadTrait;
use App\Models\Employer;
use App\Models\Intern;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    use ApiResponseTrait, UploadTrait;
    //Register new user
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'mobile' => $request->mobile
        ]);

        if ($request->hasFile('image')) {
            $image = $this->singlefileUpload($request->file('image'), 'users', $request->name, 'images');
            $user->update(['image' => $image]);
        }
        if ($user->role == 'intern') {
            Intern::create([
                'user_id' => $user->id,
            ]);
        }
        if ($user->role == 'employer') {
            Employer::create([
                'user_id' => $user->id
            ]);
        }
        $token = $user->createToken($request->email, ['remember_me' => $request->remember])->plainTextToken;

        return $this->apiSuccess(compact('token'), 'User registered successfully');
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

        return $this->apiSuccess(compact('token'), 'User registered successfully');
    }

    //logout user
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->apiSuccess(message: 'User logged out successfully');
    }
}