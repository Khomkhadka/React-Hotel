<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class permissions extends Model
{
    protected $fillable = [
    'name',
    'guard_name',
    'display_name', // add this so you can mass assign it
];
}
