<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Hotel;
use App\Models\Customer;
use App\Models\Package;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'name' => fake()->name(),
        'booked_date' => fake()->date(),
        'checkin' => fake()->date(),
        'checkout' => fake()->date(),
        'note' => fake()->sentence(),
        'hotel_id' => Hotel::factory(),
        'customer_id' => Customer::factory(),
        'package_id' => Package::factory(),
        ];
    }
}
