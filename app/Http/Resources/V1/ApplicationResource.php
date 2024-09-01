<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'skills' => json_decode($this->skills),
            'linkedin' => $this->linkedin,
            'plan' => $this->plan,
            'status' => $this->status,
            'resume' => $this->resume ? asset($this->resume) : asset($this->user->cv),
            'user_id' => $this->user_id,
            'job_id' => $this->employer_job_id,
        ];
    }
}