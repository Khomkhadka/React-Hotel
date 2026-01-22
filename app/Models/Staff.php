<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class Staff extends Authenticatable
{

       use HasRoles,SoftDeletes;

    protected $guard_name = 'staffs'; 

    protected $table = 'staff';

     protected $fillable = [
        'name',
        'email',
        'type',
        'address',
        'contact',
        'password',
        'status',
        'remake',
        'hotel_id', // foreign key linking to hotel-admin
    ];

      protected $hidden = [
        'password', 'remember_token',
    ];

     public function hotels()
    {
        return $this->belongsTo(Hotel::class,'hotel_id');
    }  
}
