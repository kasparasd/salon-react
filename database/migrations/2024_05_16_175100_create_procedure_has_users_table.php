<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * Run the migrations.
         */
        Schema::create('procedure_has_users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('procedure_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->unique(['procedure_id', 'user_id']);

            $table->foreign('procedure_id')->references('id')->on('procedures')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procedure_has_users');
    }
};