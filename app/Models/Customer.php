<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'customer_name',
        'email',
        'customer_address',
        'contact',
        'dob',
        'hotel_id'
     ];

        // customer belongs to a hotel
    public function hotels()
    {
        return $this->belongsTo(Hotel::class,'hotel_id');
    }   

     public function bookings()
    {
        return $this->hasOne(Booking::class);
    }
    

}
