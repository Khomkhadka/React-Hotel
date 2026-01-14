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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
             $table->string('name')->nullable();
            $table->string('booked_date');
            $table->string('checkin');
            $table->string('checkout');
            $table->text('note');
  
            $table->foreignId('hotel_id')
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();
            
            $table->foreignId('customer_id')
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();
            
            $table->foreignId('package_id')
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
        Schema::dropIfExists('bookings');
    }
};
