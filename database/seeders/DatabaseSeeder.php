<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'edit articles']);
        Permission::create(['name' => 'delete articles']);
        Permission::create(['name' => 'create articles']);
        Permission::create(['name' => 'publish articles']);
        Permission::create(['name' => 'unpublish articles']);
        Permission::create(['name' => 'get page statistic']);

        // create roles and assign existing permissions
        $role_editor = Role::create(['name' => 'editor']);
        $role_editor->givePermissionTo('edit articles');

        $role_chief_editor = Role::create(['name' => 'chief-editor']);
        $role_chief_editor->givePermissionTo('get page statistic');
        $role_chief_editor->givePermissionTo('edit articles');

        $role_author = Role::create(['name' => 'author']);
        $role_author->givePermissionTo('publish articles');
        $role_author->givePermissionTo('unpublish articles');
        $role_author->givePermissionTo('create articles');

        $role_admin = Role::create(['name' => 'admin']);
        $role_admin->givePermissionTo('publish articles');
        $role_admin->givePermissionTo('unpublish articles');
        $role_admin->givePermissionTo('create articles');
        $role_admin->givePermissionTo('delete articles');
        $role_admin->givePermissionTo('edit articles');

        // create demo users
        $user = \App\Models\User::create([
            'name' => 'editor',
            'email' => 'editor@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole($role_editor);

        $user = \App\Models\User::create([
            'name' => 'author',
            'email' => 'author@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole($role_author);

        $user = \App\Models\User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole($role_admin);

        $user = \App\Models\User::create([
            'name' => 'chief editor',
            'email' => 'chief-editor@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole($role_chief_editor);

        $user = \App\Models\User::create([
            'name' => 'user',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}
