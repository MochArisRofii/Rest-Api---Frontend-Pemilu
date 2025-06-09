<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Provinsi;
use Illuminate\Http\Request;

class ProvinsiController extends Controller
{
    public function index()
    {
        return response()->json(Provinsi::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_provinsi' => 'required|string|max:255',
        ]);

        $provinsi = Provinsi::create([
            'nama_provinsi' => $request->nama_provinsi,
        ]);

        return response()->json(['message' => 'Provinsi berhasil ditambahkan', 'data' => $provinsi]);
    }

    public function show($id)
    {
        $provinsi = Provinsi::find($id);
        if (!$provinsi) {
            return response()->json(['message' => 'Provinsi tidak ditemukan'], 404);
        }
        return response()->json($provinsi);
    }

    public function update(Request $request, $id)
    {
        $provinsi = Provinsi::find($id);
        if (!$provinsi) {
            return response()->json(['message' => 'Provinsi tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_provinsi' => 'required|string|max:255',
        ]);

        $provinsi->update([
            'nama_provinsi' => $request->nama_provinsi,
        ]);

        return response()->json(['message' => 'Provinsi berhasil diperbarui', 'data' => $provinsi]);
    }

    public function destroy($id)
    {
        $provinsi = Provinsi::find($id);
        if (!$provinsi) {
            return response()->json(['message' => 'Provinsi tidak ditemukan'], 404);
        }

        $provinsi->delete();
        return response()->json(['message' => 'Provinsi berhasil dihapus']);
    }
}
