<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'role' => $this->role,
            'tags' => TagResource::collection($this->tags),
            'image' => asset($this->image),
        ];
        if ($this->role === 'intern' && $this->intern) {
            $data['intern'] = new InternResource($this->intern);
        } elseif ($this->role === 'employer' && $this->employer) {
            $data['employer'] = new EmployerResource($this->employer);
        }

        return $data;
    }
}