<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pemilihan_dprs', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal'); // harus sama dgn pemilihan presiden
            $table->time('jam_mulai')->default('07:00:00');
            $table->time('jam_selesai')->default('12:00:00');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemilihan_dprs');
    }
};
