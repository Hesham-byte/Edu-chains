<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $table = 'employer_jobs';
    protected $fillable = [
        'employer_id',
        'title',
        'description',
        'location',
        'skills',
        'salary',
        'currency',
        'work_arrangement',
        'job_type',
        'category_id',
    ];
    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class, 'employer_job_id');
    }
}