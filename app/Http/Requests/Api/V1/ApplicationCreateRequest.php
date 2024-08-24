<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class ApplicationCreateRequest extends FormRequest
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
        return [
            'job_id' => 'required|exists:employer_jobs,id',
            'user_id' => 'required|exists:users,id',
            'name' => 'required',
            'email' => 'required|email',
            'mobile' => 'required|min:11|max:11|regex:/0[0-9]{9}/',
            'skills' => 'required',
            'linkedin' => 'required',
            'plan' => 'required',
            'resume' => 'nullable|mimes:pdf|max:4096',
        ];
    }
}