<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Kota;
use Illuminate\Http\Request;

class KotaController extends Controller
{
    public function index()
    {
        return response()->json(Kota::with('provinsi')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'provinsi_id' => 'required|exists:provinsis,id',
        ]);

        $kota = Kota::create($request->all());

        return response()->json(['message' => 'Kota berhasil ditambahkan', 'data' => $kota], 201);
    }

    public function show($id)
    {
        $kota = Kota::with('provinsi')->findOrFail($id);
        return response()->json($kota);
    }

    public function update(Request $request, $id)
    {
        $kota = Kota::findOrFail($id);
        $request->validate([
            'nama' => 'required|string',
            'provinsi_id' => 'required|exists:provinsis,id',
        ]);

        $kota->update($request->all());

        return response()->json(['message' => 'Kota berhasil diperbarui', 'data' => $kota]);
    }

    public function destroy($id)
    {
        $kota = Kota::findOrFail($id);
        $kota->delete();

        return response()->json(['message' => 'Kota berhasil dihapus']);
    }
}
