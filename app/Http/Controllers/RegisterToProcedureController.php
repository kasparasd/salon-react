<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterToProcedureRequest;
use App\Http\Requests\UpdateRegisterToProcedureRequest;
use App\Models\RegisterToProcedure;
use App\Models\Procedure;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterToProcedureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegisterToProcedureRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(RegisterToProcedure $registerToProcedure)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RegisterToProcedure $registerToProcedure)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRegisterToProcedureRequest $request, RegisterToProcedure $registerToProcedure)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RegisterToProcedure $registerToProcedure)
    {
        //
    }

    public function registerToProcedure()
    {
    //     $arr = [1,3,4];
    //     $sum = 5;

    //     foreach ($arr as $key => $val) {
    //       for($i = $key; $i<count($arr); $i++){
    //         $curr = $val;
    //         if($curr + $arr[$i] == $sum){
    //             return $curr . " + " . $arr[$i];
    //         }

    //       }
    //       return dump (false);
            
    //     }

        $availableProcedures = Procedure::all();

        return inertia('Procedures/RegisterToProcedure', [
            'procedures' => $availableProcedures
        ]);
    }
    public function registerToProcedure2(Procedure $procedure)
    {
        $employees = $procedure->users;

        return inertia('Procedures/RegisterToProcedure2', [
            'procedure' => $procedure,
            'employees' => $employees
        ]);
    }
    public function registerToProcedure3(Procedure $procedure, User $employee)
    {
        return inertia('Procedures/RegisterToProcedure3', [
            'procedure' => $procedure,
            'employee' => $employee
        ]);
    }
    public function registerToProcedure4(Request $request, Procedure $procedure, User $employee)
    {
        return inertia('Procedures/RegisterToProcedure4', [
            'procedure' => $procedure,
            'employee' => $employee,
            'date' => $request->date,
            'time' => $request->time,
        ]);
    }
    public function registerToProcedure5(Request $request, Procedure $procedure, User $employee)
    {

        $procedureDuration = $procedure->duration;

        $startTime = Carbon::createFromFormat('Y-m-d H:i:s', "$request->date $request->time:00");
        $endTime = clone $startTime;
        $endTime = $endTime->addMinutes($procedureDuration);


        $isOccupied = RegisterToProcedure::where(function ($query) use ($startTime, $endTime) {
            $query->where('start', '<', $endTime)
                ->where('end', '>', $startTime);
        })
            ->exists();

        if ($isOccupied) {
            echo "Laikas tarp $startTime ir $endTime yra užimtas.";
        } else {
            echo "Laikas tarp $startTime ir $endTime yra laisvas.";
            RegisterToProcedure::create(
                [
                    'user_id' => Auth::user()->id,
                    'employee_id' => $employee->id,
                    'procedure_id' => $procedure->id,
                    'start' => $startTime,
                    'end' => $endTime
                ]
            );
        }
    }

    public function getOccupiedTimes(Request $request)
    {
        $date = $request->date;
        $employeeId = $request->employee;
        $procedureId = $request->procedure;

        $procedure = Procedure::where('id', $procedureId)->first();
        $procedureDuration = $procedure->duration;
        $procedureDurationH = (int) floor($procedureDuration / 60);
        $procedureDurationM = ($procedureDuration % 60);

        $times = [];


        for ($i = 8; $i < 17 - $procedureDurationH; $i++) {
            if ($i == 16 - $procedureDurationH) {
                for ($j = 0; $j <= 60 - $procedureDurationM; $j += 15) {

                    $startTime = Carbon::createFromFormat('Y-m-d H:i:s', $date . ' ' . sprintf("%02d", $i) . ':' . sprintf("%02d", $j) . ':00');
                    $endTime = clone $startTime;
                    $endTime = $endTime->addMinutes($procedureDuration);

                    $isOccupied = RegisterToProcedure::where(function ($query) use ($startTime, $endTime, $employeeId) {
                        $query->where('employee_id', '=', $employeeId)
                            ->where('start', '<', $endTime)
                            ->where('end', '>', $startTime);
                    })
                        ->exists();
                    if ($isOccupied) {
                        $times[sprintf("%02d", $i) . ':' . sprintf("%02d", $j)] = 'occupied';
                    } else {
                        $times[sprintf("%02d", $i) . ':' . sprintf("%02d", $j)] = 'good';
                    }
                }
            } else {
                for ($j = 0; $j < 60; $j += 15) {
                    $startTime = Carbon::createFromFormat('Y-m-d H:i:s', $date . sprintf("%02d", $i) . ':' . sprintf("%02d", $j) . ':00');
                    $endTime = clone $startTime;
                    $endTime = $endTime->addMinutes($procedureDuration);

                    $isOccupied = RegisterToProcedure::where(function ($query) use ($startTime, $endTime, $employeeId) {
                        $query->where('employee_id', '=', $employeeId)
                            ->where('start', '<', $endTime)
                            ->where('end', '>', $startTime);
                    })
                        ->exists();
                    if ($isOccupied) {
                        $times[sprintf("%02d", $i) . ':' . sprintf("%02d", $j)] = 'occupied';
                    } else {
                        $times[sprintf("%02d", $i) . ':' . sprintf("%02d", $j)] = 'good';
                    }
                }
            }
        }

        return $times;
    }

    public function showProcedureSchedule()
    {
        $today = Carbon::now()->toDateString();

        $employeeId = Auth::user()->id;
        $procedures = RegisterToProcedure::where('employee_id', '=', $employeeId)->where('start', '>=', $today)->with('user', 'employee', 'procedure')->get()->groupBy(function ($item) {
            return $item->start->format('Y-m-d');
        });
        // dd($procedures);
        return view('procedures.procedureSchedule', [
            'procedures' => $procedures,
        ]);
    }
    public function showPreviousProcedureSchedule()
    {
        $today = Carbon::now()->toDateString();
        $employeeId = Auth::user()->id;
        $procedures = RegisterToProcedure::where('employee_id', '=', $employeeId)->where('start', '<=', $today)->with('user', 'employee', 'procedure')->get()->groupBy(function ($item) {
            return $item->start->format('Y-m-d');
        });
        // dd($procedures);
        return view('procedures.previousProcedureSchedule', [
            'procedures' => $procedures,
        ]);
    }
}