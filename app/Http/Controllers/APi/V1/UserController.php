<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\UserUpdateRequest;
use App\Models\User;
use App\Http\Resources\V1\UserResource;
use App\Http\Traits\ApiResponseTrait;
use App\Http\Traits\UploadTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Intern;
use App\Models\Employer;

class UserController extends Controller
{
    use ApiResponseTrait, UploadTrait;
    public function show(Request $request)
    {
        $user = new UserResource($request->user());

        return $this->apiSuccess(compact('user'), 'User fetched successfully');
    }

    public function update(UserUpdateRequest $request)
    {
        $user = $request->user();
        $cv = '';
        $logo = $user->role === 'employer' ? $user->employer->company_logo : '';
        $image = $user->image;
        if ($request->hasFile('image')) {
            $image = $this->singlefileUpload($request->file('image'), 'users', $request->name, 'images');
        }
        if ($request->hasFile('company_logo')) {
            $logo = $this->singlefileUpload($request->file('company_logo'), 'companies', $request->name, 'images');
        }
        if ($request->hasFile('cv')) {
            $cv = $this->singlefileUpload($request->file('cv'), 'users', $request->name, 'resumes');
        }
        $user->update([
            'name' => $request->name,
            'mobile' => $request->mobile,
            'image' => $image
        ]);

        if ($user->role === 'intern') {
            $intern = Intern::where('user_id', $user->id)->first();
            $intern->update([
                'title' => $request->title,
                'cv' => $cv,
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
                'company_logo' => $logo,
            ]);
        }

        if ($request->has('tags')) {
            $user->syncTags($request->tags);
        }

        return $this->apiSuccess(message: 'Profile updated successfully');
    }
}