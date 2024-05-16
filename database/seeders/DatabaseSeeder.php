<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Permission::allPermissions()->each(function ($perm) {
            Permission::create(['name' => $perm]);
        });

        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo('user.view');
        $role->givePermissionTo('user.add');
        $role->givePermissionTo('user.edit');
        $role->givePermissionTo('user.delete');

        $role->givePermissionTo('role.view');
        $role->givePermissionTo('role.add');
        $role->givePermissionTo('role.edit');
        $role->givePermissionTo('role.delete');
        $role->givePermissionTo('role.AssignPermission');

        $role2 = Role::create(['name' => 'employee']);
        $role2->givePermissionTo('employee.view.schedule');

        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
        ]);
        DB::table('users')->insert([
            'name' => 'employee1',
            'email' => 'employee1@gmail.com',
            'password' => Hash::make('password'),
        ]);
        DB::table('users')->insert([
            'name' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('password'),
        ]);

        $admin = User::where('email', 'admin@gmail.com')->first();
        $admin->assignRole('admin');
        $admin->assignRole('employee');

        $employee1 = User::where('email', 'employee1@gmail.com')->first();
        $employee1->assignRole('employee');
    }
}
