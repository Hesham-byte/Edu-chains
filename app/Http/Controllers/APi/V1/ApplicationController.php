<?php

namespace App\Http\Controllers\APi\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\ApplicationCreateRequest;
use App\Http\Resources\V1\ApplicationResource;
use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{

    public function index($jobId)
    {
        $job = Job::findOrFail($jobId);
        $applications = ApplicationResource::collection($job->applications);
        return response()->json(['data' => ['applications' => $applications], 'message' => 'Request sent successfully'], 201);
    }
    public function store(ApplicationCreateRequest $request, $jobId)
    {
        $data = [
            'employer_job_id' => $jobId,
            'user_id' => $request->user_id,
            'name' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'skills' => json_encode($request->skills),
            'linkedin' => $request->linkedin,
            'plan' => $request->plan,
        ];
        try {
            $application = new ApplicationResource(Application::create($data));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
        return response()->json(['data' => ['application' => $application], 'message' => 'Application created successfully'], 201);
    }
}