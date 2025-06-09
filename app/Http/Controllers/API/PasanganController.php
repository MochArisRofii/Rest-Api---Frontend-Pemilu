<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pasangan;
use Illuminate\Http\Request;

class PasanganController extends Controller
{
    public function index()
    {
        return response()->json(Pasangan::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_presiden' => 'required|string',
            'nama_wakil_presiden' => 'required|string',
            'partai_pendukung' => 'nullable|string',
            'visi_misi' => 'nullable|string',
        ]);

        $pasangan = Pasangan::create($request->all());

        return response()->json(['message' => 'Pasangan calon berhasil ditambahkan', 'data' => $pasangan], 201);
    }

    public function show($id)
    {
        $pasangan = Pasangan::findOrFail($id);
        return response()->json($pasangan);
    }

    public function update(Request $request, $id)
    {
        $pasangan = Pasangan::findOrFail($id);

        $request->validate([
            'nama_presiden' => 'required|string',
            'nama_wakil_presiden' => 'required|string',
            'partai_pendukung' => 'nullable|string',
            'visi_misi' => 'nullable|string',
        ]);

        $pasangan->update($request->all());

        return response()->json(['message' => 'Data pasangan berhasil diperbarui', 'data' => $pasangan]);
    }

    public function destroy($id)
    {
        $pasangan = Pasangan::findOrFail($id);
        $pasangan->delete();

        return response()->json(['message' => 'Data pasangan berhasil dihapus']);
    }
}
