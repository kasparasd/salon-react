<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcedureHasUsers extends Model
{
    use HasFactory;

    protected $fillable = [
        "procedure_id",
        "user_id",
    ];

}