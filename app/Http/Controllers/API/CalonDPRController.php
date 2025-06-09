<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CalonDpr;
use Illuminate\Http\Request;

class CalonDPRController extends Controller
{
    // Tampilkan semua calon dengan filter provinsi dan kota (jika diberikan)
    public function index(Request $request)
    {
        $query = CalonDPR::query();

        if ($request->provinsi_id) {
            $query->where('provinsi_id', $request->provinsi_id);
        }

        if ($request->kota_id) {
            $query->where('kota_id', $request->kota_id);
        }

        return response()->json($query->get());
    }

    // Tambah calon baru
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'partai' => 'required|string|max:255',
            'provinsi_id' => 'required|exists:provinsis,id',
            'kota_id' => 'required|exists:kotas,id',
        ]);

        // Cek duplikat
        $cek = CalonDPR::where('nama', $request->nama)->where('provinsi_id', $request->provinsi_id)->where('kota_id', $request->kota_id)->first();

        if ($cek) {
            return response()->json(['message' => 'Calon dengan nama ini sudah terdaftar di provinsi dan kota tersebut'], 422);
        }

        $calon = CalonDPR::create($request->all());
        return response()->json($calon, 201);
    }

    // Update data calon
    public function update(Request $request, $id)
    {
        $calon = CalonDPR::findOrFail($id);

        $request->validate([
            'nama' => 'required|string|max:255',
            'partai' => 'required|string|max:255',
            'provinsi_id' => 'required|exists:provinsis,id',
            'kota_id' => 'required|exists:kotas,id',
        ]);

        $calon->update($request->all());

        return response()->json($calon);
    }

    // Hapus calon
    public function destroy($id)
    {
        $calon = CalonDpr::findOrFail($id);
        $calon->delete();

        return response()->json(['message' => 'Data calon berhasil dihapus']);
    }
}
