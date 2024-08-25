<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:11',
            'title' => 'nullable|string|max:255',
            'cv' => 'nullable|mimes:pdf|max:4096',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:4096',
            'description' => 'nullable|string',
            'company_name' => 'nullable|string|max:255',
            'company_address' => 'nullable|string|max:255',
            'company_website' => 'nullable|string|max:255',
            'company_email' => 'nullable|string|email|max:255',
            'company_phone' => 'nullable|string|max:11',
            'company_logo' => 'nullable|string|max:255',
            'tags' => 'array',
            'tags.*' => 'string|max:255'
        ];
    }
}