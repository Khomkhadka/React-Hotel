<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    protected $fillable = [
        'section',
        'title',
        'content',
        'image',
        'extra',
    ];

    protected $casts = [
        'extra' => 'array',
    ];
}
