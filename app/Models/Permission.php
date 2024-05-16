<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SP;

class Permission extends SP
{

    public static function allPermissions()
    {
        return collect([
            'user.view',
            'user.add',
            'user.edit',
            'user.delete',

            'role.view',
            'role.add',
            'role.edit',
            'role.delete',
            'role.AssignPermission',

            'employee.view.schedule',
        ]);
    }
}
