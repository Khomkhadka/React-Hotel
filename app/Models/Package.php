<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'status',
        'hotel_id',
    ];

        // Booking belongs to a hotel
    public function hotels()
    {
        return $this->belongsTo(Hotel::class,'hotel_id');
    }   
    
     public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
