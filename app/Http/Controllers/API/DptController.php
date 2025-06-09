<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Dpt;
use Illuminate\Http\Request;

class DptController extends Controller
{
    public function index()
    {
        return response()->json(Dpt::with('tps')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'nik' => 'required|unique:dpts,nik',
            'alamat' => 'required',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tps_id' => 'required|exists:tps,id',
        ]);

        $dpt = Dpt::create($request->all());
        return response()->json($dpt);
    }

    public function show($id)
    {
        return response()->json(Dpt::with('tps')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $dpt = Dpt::findOrFail($id);
        $dpt->update($request->all());
        return response()->json($dpt);
    }

    public function destroy($id)
    {
        Dpt::destroy($id);
        return response()->json(['message' => 'Data DPT berhasil dihapus']);
    }

    // ✅ Ban
    public function ban($id)
    {
        $dpt = Dpt::findOrFail($id);
        $dpt->update(['is_banned' => true]);
        return response()->json(['message' => 'Pemilih telah diban']);
    }

    // ✅ Unban
    public function unban($id)
    {
        $dpt = Dpt::findOrFail($id);
        $dpt->update(['is_banned' => false]);
        return response()->json(['message' => 'Pemilih telah diunban']);
    }

}
