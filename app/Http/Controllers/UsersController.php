<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Intern;
use App\Models\Employer;

class UsersController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $user->load(['tags']);

        if ($user->role === 'intern' && $user->intern) {
            $user->title = $user->intern->title;
            $user->description = $user->intern->description;
            $user->cv = $user->intern->cv;
        } elseif ($user->role === 'employer' && $user->employer) {
            $user->company_name = $user->employer->company_name;
            $user->company_address = $user->employer->company_address;
            $user->company_website = $user->employer->company_website;
            $user->company_email = $user->employer->company_email;
            $user->company_phone = $user->employer->company_phone;
            $user->company_logo = $user->employer->company_logo;
        }

        return response()->json($user, 200);
    }

    public function edit(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'mobile' => 'required|string|max:11',
            'cv' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'company_name' => 'nullable|string|max:255',
            'company_address' => 'nullable|string|max:255',
            'company_website' => 'nullable|string|max:255',
            'company_email' => 'nullable|string|email|max:255',
            'company_phone' => 'nullable|string|max:11',
            'company_logo' => 'nullable|string|max:255',
            'tags' => 'array',
            'tags.*' => 'string|max:255'
        ]);

        $user->update([
            'name' => $request->name,
            'mobile' => $request->mobile
        ]);

        if ($user->role === 'intern') {
            $intern = Intern::where('user_id', $user->id)->first();
            $intern->update([
                'title' => $request->title,
                'cv' => $request->cv,
                'description' => $request->description
            ]);
        } elseif ($user->role === 'employer') {
            $employer = Employer::where('user_id', $user->id)->first();
            $employer->update([
                'company_name' => $request->company_name,
                'company_address' => $request->company_address,
                'company_website' => $request->company_website,
                'company_email' => $request->company_email,
                'company_phone' => $request->company_phone,
                'company_logo' => $request->company_logo,
            ]);
        }

        if ($request->has('tags')) {
            $user->syncTags($request->tags);
        }

        return response()->json(['message' => 'Profile updated successfully']);
    }
}
