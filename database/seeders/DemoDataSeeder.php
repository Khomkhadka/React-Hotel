<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Hotel;
use App\Models\Package;
use App\Models\Customer;
use App\Models\Booking;


class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          Hotel::factory()
        ->count(3)
        ->has(Package::factory()->count(5))
        ->has(Customer::factory()->count(10))
        ->create()
        ->each(function ($hotel) {
            Booking::factory()
                ->count(5)
                ->create([
                    'hotel_id' => $hotel->id,
                    'customer_id' => $hotel->customers()->inRandomOrder()->first()->id,
                    'package_id' => $hotel->packages()->inRandomOrder()->first()->id,
                ]);
        });
    }
}
