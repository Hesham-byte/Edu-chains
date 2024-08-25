<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployerResource extends JsonResource
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
            'company_name' => $this->company_name,
            'company_address' => $this->company_address,
            'company_website' => $this->company_website,
            'company_email' => $this->company_email,
            'company_phone' => $this->company_phone,
            'company_logo' => asset($this->company_logo)
        ];
    }
}