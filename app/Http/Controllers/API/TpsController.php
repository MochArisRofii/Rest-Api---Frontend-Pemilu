<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tps;
use Illuminate\Http\Request;

class TpsController extends Controller
{
    public function index()
    {
        return response()->json(Tps::with('kota')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'kota_id' => 'required|exists:kotas,id',
        ]);

        $tps = Tps::create($request->all());
        return response()->json($tps);
    }

    public function show($id)
    {
        return response()->json(Tps::with('dpt')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $tps = Tps::findOrFail($id);
        $tps->update($request->all());
        return response()->json($tps);
    }

    public function destroy($id)
    {
        Tps::destroy($id);
        return response()->json(['message' => 'TPS berhasil dihapus']);
    }
}
