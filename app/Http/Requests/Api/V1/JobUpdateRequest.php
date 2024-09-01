<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class JobUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $currencies = [
            'USD',
            'EUR',
            'EGP',
            'SAR',
        ];
        return [
            'employer_id' => 'required|exists:employers,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'skills' => 'required|string|max:255',
            'salary' => 'nullable|numeric',
            'currency' => 'nullable|string|in:' . implode(',', $currencies),
            'work_arrangement' => 'required|string|in:remote,onsite,hybrid',
            'job_type' => 'required|string|in:full-time,part-time',
            'category_id' => 'required|exists:categories,id',
        ];
    }
}