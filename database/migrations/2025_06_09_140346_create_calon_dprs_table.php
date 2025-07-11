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
        Schema::create('calon_dprs', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('partai');
            $table->foreignId('provinsi_id')->constrained()->onDelete('cascade');
            $table->foreignId('kota_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calon_dprs');
    }
};
