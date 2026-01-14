<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Hotel;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'name' => fake()->word().' Package',
        'description' => fake()->sentence(),
        'price' => fake()->numberBetween(500, 5000),
        'status' => 'active',
        'hotel_id' => Hotel::factory(),
        ];
    }
}
