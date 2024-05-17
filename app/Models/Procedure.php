<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procedure extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "duration"
    ];

    static $durations = [
        15 => "0:15",
        30 => "0:30",
        45 => "0:45",
        60 => "1:00",
        75 => "1:15",
        90 => "1:30",
        105 => "1:45",
        120 => "2:00",
        135 => "2:15",
        150 => "2:30",
        165 => "2:45",
        180 => "3:00",
    ];

    // Procedure.php
    public function users()
    {
        return $this->belongsToMany(User::class, 'procedure_has_users', 'procedure_id', 'user_id');
    }
}