<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\JobCreateRequest;
use App\Http\Resources\V1\CategoryResource;
use App\Http\Resources\V1\JobResource;
use App\Http\Traits\ApiResponseTrait;
use App\Models\Category;
use App\Models\Employer;
use App\models\job;
use Illuminate\Http\Request;

class JobController extends Controller
{

    use ApiResponseTrait;
    public function index(Request $request)
    {
        if ($request->has('employer_id')) {
            $employer = Employer::find($request->employer_id);
            $jobs = JobResource::collection($employer->jobs);
            return $this->apiSuccess(compact(['jobs', 'employer']));
        }
        return Job::all();
    }

    public function store(JobCreateRequest $request)
    {

        $job = new JobResource(Job::create($request->all()));
        return $this->apiSuccess(compact('job'));
    }

    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);
        $job->update($request->all());
        return response()->json($job, 200);
    }

    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
        return response()->json(null, 204);
    }

    public function show($id)
    {
        $job = Job::findOrFail($id);
        return response()->json($job, 200);
    }
    public function getByCategory($categoryId)
    {
        $category = new CategoryResource(Category::findOrFail($categoryId));

        $jobs = JobResource::collection($category->jobs);
        return $this->apiSuccess(compact(['jobs', 'category']));
    }
}