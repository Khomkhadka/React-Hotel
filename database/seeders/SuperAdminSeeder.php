<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'super-admin']);

         $user = User::firstOrCreate(
            ['email' => 'superadmin@system.com'],
            [
                'name' => 'super-admin',
                'password' => Hash::make('admin123'),
                'address' => 'System',
                'contact' => '9800000000',
                'status' => 'active',
            ]
        );

        $user->assignRole('super-admin');
        
    
    }
}
