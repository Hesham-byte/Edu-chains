<?php

namespace App\Http\Controllers\APi\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\ApplicationCreateRequest;
use App\Http\Resources\V1\ApplicationResource;
use App\Http\Traits\ApiResponseTrait;
use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    use ApiResponseTrait;
    public function index($jobId)
    {
        $job = Job::findOrFail($jobId);
        if ($job->applications->count() != 0) {
            $applications = ApplicationResource::collection($job->applications);
            return $this->apiSuccess(compact('applications'), 'Applications fetched successfully');
        }
        return $this->apiSuccess([], 'No applications found');
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
        $application = new ApplicationResource(Application::create($data));
        return $this->apiSuccess(compact('application'), 'Application created successfully');
    }

    public function show($applicationId)
    {
        $application = Application::findOrFail($applicationId);
        $application = new ApplicationResource($application);
        return $this->apiSuccess(compact('application'), 'Application fetched successfully');
    }

    public function takeAction(Request $request, $applicationId)
    {
        $request->validate(['status' => 'required|in:accepted,rejected']);
        $application = Application::findOrFail($applicationId);
        if ($application->status == 'pending') {
            $application->update(['status' => $request->status]);
            $application = new ApplicationResource($application);
            return $this->apiSuccess(compact('application'), 'Application has been ' . $request->status . ' successfully');
        }
        return $this->apiSuccess(compact('application'), 'This application had been ' . $request->status . ' before');
    }
}