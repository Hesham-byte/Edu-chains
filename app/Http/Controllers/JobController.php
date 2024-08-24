<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\job;

class JobController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('employer_id')) {
            return Job::where('employer_id', $request->employer_id)->get();
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
        $jobs = Job::where('category_id', $categoryId)->get();
        return response()->json($jobs);
    }
}
