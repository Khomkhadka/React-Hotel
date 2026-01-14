<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');                        // Package name
            $table->text('description')->nullable();       // Package description
            $table->decimal('price', 10, 2);               // Price of package
            $table->enum('status', ['active', 'inactive'])->default('inactive'); // Active / inactive
            $table->foreignId('hotel_id')                  // optional: link package to a hotel
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
