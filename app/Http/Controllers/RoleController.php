<?php

namespace App\Http\Controllers;

use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleHasPermissionsResource;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;



class RoleController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            // new Middleware('permission:role.view', only: ['index']),
            // new Middleware('permission:role.add', only: ['create']),
            // new Middleware('permission:role.edit', only: ['edit']),
            // new Middleware('permission:role.delete', only: ['destroy']),
            // new Middleware('permission:role.AssignPermission', only: ['addPermissionToRole']),
        ];
    }

    public function index()
    {
        $roles = Role::get();
   
        return inertia("Roles/Index", [
            'roles'=>RoleResource::collection($roles),
            'ok'=>session('ok'),
        ]);
    }
    public function create()
    {
        return inertia('Roles/Create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:roles,name'
            ]
        ]);

        Role::create([
            'name' => $request->name
        ]);
        return redirect('/roles')->with('ok', 'Role Created Successfully');
    }
    public function edit(Role $role)
    {
        return inertia('Roles/Edit', [
            'role' => $role
        ]);
    }
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:roles,name,' . $role->id
            ]
        ]);

        $role->update([
            'name' => $request->name
        ]);
        return to_route('roles.index')->with('ok', 'Role Updated Successfully');
    }
    public function destroy($roleId)
    {
        $role = Role::findOrFail($roleId);
        $role->delete();
        return to_route('roles.index')->with('ok', 'Role Deleted Successfully');
    }

    public function addPermissionToRole($roleId)
    {
        $permissions = Permission::get();
        $role = Role::findOrFail($roleId);
        $rolePermissions = DB::table('role_has_permissions')
        ->where('role_has_permissions.role_id', $role->id)
        ->pluck('role_has_permissions.permission_id')->all();

        
        
        return inertia("Roles/AddPermission", [
            'role' => $role,
            'permissions' => PermissionResource::collection($permissions),
            'rolePermissions' => $rolePermissions,
            
        ]);
    }

    public function givePermissionToRole(Request $request, $roleId)
    {
        $role = Role::findOrFail($roleId);
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('ok', 'Permissions added to role');
    }
}
