<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasangan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_presiden',
        'nama_wakil_presiden',
        'partai_pendukung',
        'visi_misi'
    ];
}
