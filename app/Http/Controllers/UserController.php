<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{


    public static function middleware(): array
    {
        return [
            // new Middleware('permission:user.view', only: ['index']),
            // new Middleware('permission:user.create', only: ['create']),
            // new Middleware('permission:user.edit', only: ['edit']),
            // new Middleware('permission:user.delete', only: ['destroy']),
        ];
    }

    public function index()
    {
        $users = User::with('roles')->get()->map(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ];
        });
    
        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        $roles = Role::pluck('name')->all();
        return inertia('Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|max:255|min:8',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->syncRoles($request->roles);

        return to_route('user.index')->with('ok', 'Vartotojas sekmingai sukurtas');
    }

    public function edit(User $user)
    {
        $roles = Role::pluck('name')->all();
        $userRoles = $user->roles->pluck('name')->all();

        // Check assigned procedures to user
        // $procedures = $user->procedures;

        // dd($procedures);

        return inertia('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'userRoles' => $userRoles
        ]);
    }

    public function update(Request $request, User $user)
    {
      
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
        ]);

        $user->syncRoles($request->roles);

        return to_route('user.index')->with('ok', 'Vartotojas atnaujintas');
    }

    public function destroy($userId)
    {

        User::findOrFail($userId)->delete();
        return to_route('user.index')->with('ok', 'Vartotojas istrintas');
    }
}