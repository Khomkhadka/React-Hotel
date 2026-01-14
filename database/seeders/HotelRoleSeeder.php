<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class HotelRoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::firstOrCreate([
            'name' => 'hotel-manager',
            'guard_name' => 'hotels',
        ]);

        Role::firstOrCreate([
            'name' => 'hotel-staff',
            'guard_name' => 'hotels',
        ]);

        Permission::create([
          'name' => 'manager',
          'guard_name' => 'hotels',
        ]);
         Permission::create([
          'name' => 'staff',
          'guard_name' => 'hotels',
        ]);
        
    }

    
}
