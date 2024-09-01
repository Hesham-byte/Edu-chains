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

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function getCvAttribute()
    {

        $cv = $this->resume != '' ? $this->resume : $this->user->intern->cv;

        return asset($cv);
    }
}