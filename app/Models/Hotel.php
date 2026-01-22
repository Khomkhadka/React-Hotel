<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Models\Role;

class Hotel extends Authenticatable
{
    use HasFactory,Notifiable, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $guard = 'hotels';
    
    protected $table = 'hotels';
    protected $fillable = [
        'name',
        'email',
        'type',
        'address',
        'contact',
        'password',
        'status',
        'remake',
    ];
    

      protected $hidden = [
        'password', 'remember_token',
    ];
    /**
     * The admin (User) that owns this hotel.
     */
    // public function admins()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }

    /**
     * Optionally, you can add relationships for bookings or packages if needed:
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function packages()
    {
        return $this->hasMany(Package::class);
    }

     public function customers()
    {
        return $this->hasMany(Customer::class);
    }
     public function staffs()
    {
        return $this->hasMany(Staff::class);
    }
}
