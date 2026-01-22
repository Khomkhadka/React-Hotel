<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Permissions for admin (web guard)
        $webPermissions = [
            'View User','Create User','Edit User','Delete User',
            'View Role','Create Role','Edit Role','Delete Role',
            'View Permission','Create Permission','Edit Permission','Delete Permission',
            'View Hotel','Create Hotel','Edit Hotel','Delete Hotel'

        ];

        foreach ($webPermissions as $permission) {
            Permission::firstOrCreate([
                'display_name' => $permission,
               'name'=>  Str::slug($permission),
                'guard_name' => 'web',
            ]);
        }

        // Permissions for hotel staff (staffs guard)
        $staffPermissions = [
            'View Booking','Create Booking','Edit Booking','Delete Booking',
            'View Package','Create Package','Edit Package','Delete Package',
            'View Customer','Create Customer','Edit Customer','Delete Customer'
        ];

        foreach ($staffPermissions as $permission) {
            Permission::firstOrCreate([
                'display_name' => $permission,
               'name'=>  Str::slug($permission),
                'guard_name' => 'staffs',
            ]);
        }

        $this->command->info('Permissions seeded successfully!');
    }
}
