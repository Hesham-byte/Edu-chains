<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
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

    public function store(Request $request)
    {
        $request->validate([
            'employer_id' => 'required|exists:employers,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'skills' => 'nullable|string|max:255',
            'salary' => 'nullable|numeric',
            'work_arrangement' => 'nullable|string|in:remote,onsite,hybrid',
            'job_type' => 'nullable|string|in:full-time,part-time',
            'category_id' => 'required|exists:categories,id',
        ]);

        $job = Job::create($request->all());
        return response()->json($job, 201);
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