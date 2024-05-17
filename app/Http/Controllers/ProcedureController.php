<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcedureRequest;
use App\Http\Requests\UpdateProcedureRequest;
use App\Models\Procedure;
use App\Models\ProcedureHasUsers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProcedureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $procedures = Procedure::all();
        
        return inertia("Project/Procedures/Index", [
            "procedures" => $procedures
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $durations = Procedure::$durations;
        return view("procedures.create", [
            'durations' => $durations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProcedureRequest $request)
    {
        Procedure::create($request->all());
        return redirect()->route("procedures-index")->with("info", "Nauja procedūra sukurta");
    }

    /**
     * Display the specified resource.
     */
    public function show(Procedure $procedure)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Procedure $procedure)
    {
        return view("procedures.edit", [
            'procedure' => $procedure
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProcedureRequest $request, Procedure $procedure)
    {
        $request->validate([
            'name' => 'required|min:3|max:160',
        ]);

        $procedure->update($request->all());
        return redirect()->route('procedures-index')->with('info', 'Proceduros pavadinimas atnaujintas');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Procedure $procedure)
    {
        $procedure->delete();
        return redirect()->route('procedures-index')->with('info', 'Procedura istrinta');
    }
    public function addEmployees(Procedure $procedure)
    {

        $usersAssignedToProcedure = $procedure->users->pluck('id')->toArray();
        $users = User::all();

        return view('procedures.addEmployee', [
            'users' => $users,
            'procedure' => $procedure,
            'usersAssignedToProcedure' => $usersAssignedToProcedure
        ]);
    }
    public function employeeToProcedure(Request $request, $procedureId)
    {
        $procedure = Procedure::findOrFail($procedureId);
        $users = $request->users;
        $procedure->users()->sync($users);

        return redirect()->route('procedures-index')->with('ok', 'Darbuotojai prideti prie proceduros');
    }
}