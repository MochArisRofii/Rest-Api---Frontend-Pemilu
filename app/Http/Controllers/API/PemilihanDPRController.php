<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PemilihanDPR;
use Illuminate\Http\Request;

class PemilihanDPRController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date',
        ]);

        // validasi agar hanya ada 1 pemilihan di tanggal tertentu
        $cek = PemilihanDPR::where('tanggal', $request->tanggal)->first();
        if ($cek) {
            return response()->json(['message' => 'Pemilihan pada tanggal ini sudah dibuat'], 422);
        }

        $pemilihan = PemilihanDPR::create([
            'tanggal' => $request->tanggal,
            'jam_mulai' => '07:00:00',
            'jam_selesai' => '12:00:00',
        ]);

        return response()->json($pemilihan);
    }
}
