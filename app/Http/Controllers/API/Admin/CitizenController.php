<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CitizenController extends Controller
{
    public function index()
    {
        $citizens = User::where('role', 'user')->get();
        return response()->json($citizens);
    }

    // Detail user
    public function show($id)
    {
        $user = User::where('role', 'user')->findOrFail($id);
        return response()->json($user);
    }

    // Ban / Unban user
    public function toggleBan($id)
    {
        $user = User::where('role', 'user')->findOrFail($id);
        $user->is_banned = !$user->is_banned;
        $user->save();

        return response()->json(['message' => $user->is_banned ? 'User dibanned' : 'User diunban']);
    }

    // Update biodata
    public function update(Request $request, $id)
    {
        $request->validate([
            'tanggal_lahir' => 'nullable|date',
            'provinsi_domisili' => 'nullable|string',
            'kota_domisili' => 'nullable|string',
        ]);

        $user = User::where('role', 'user')->findOrFail($id);
        $user->update($request->only('tanggal_lahir', 'provinsi_domisili', 'kota_domisili'));

        return response()->json(['message' => 'Biodata diperbarui', 'user' => $user]);
    }

    // Delete user
    public function destroy($id)
    {
        $user = User::where('role', 'user')->findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Warga negara berhasil dihapus']);
    }
}
