<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Hotel;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'customer_name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'customer_address' => fake()->address(),
        'contact' => fake()->phoneNumber(),
        'dob' => fake()->date(),
        'hotel_id' => Hotel::factory(),
        ];
    }
}
