<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hotel>
 */
class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
       'name' => fake()->company(),
        'email' => fake()->unique()->companyEmail(),
        'type' => fake()->randomElement(['Hotel','Restaurant']),
        'address' => fake()->address(),
        'contact' => fake()->phoneNumber(),
        'password' => bcrypt('hotel123'),
        'status' => 'active',
       
        ];
    }
}
