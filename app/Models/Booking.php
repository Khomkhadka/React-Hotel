<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'booked_date',
        'checkin',
        'checkout',
        'note',
        'hotel_id',
        'customer_id',
        'package_id',
    ];

    // Booking belongs to a hotel
    public function hotels()
    {
        return $this->belongsTo(Hotel::class,'hotel_id');
    }

    // Booking belongs to a customer (from users or separate Customer model)
    public function customers()
    {
        return $this->belongsTo(Customer::class, 'customer_id'); // or Customer::class if separate
    }

    // Booking belongs to a package
    public function packages()
    {
        return $this->belongsTo(Package::class,'package_id');
    }

}

