<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dpt extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'nik', 'alamat', 'jenis_kelamin', 'tps_id', 'is_banned'];

    public function tps()
    {
        return $this->belongsTo(Tps::class);
    }
}
