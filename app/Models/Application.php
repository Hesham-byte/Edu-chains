<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employer_job_id',
        'status',
        'name',
        'email',
        'mobile',
        'skills',
        'linkedin',
        'plan',
        'resume',
    ];
}