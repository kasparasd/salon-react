<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegisterToProcedure extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "employee_id",
        "procedure_id",
        "start",
        "end"
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
    public function procedure()
    {
        return $this->belongsTo(Procedure::class, 'procedure_id');
    }
}