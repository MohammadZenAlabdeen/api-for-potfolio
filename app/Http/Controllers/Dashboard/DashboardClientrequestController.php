<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Clientrequest;

class DashboardClientrequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests=Clientrequest::all();
        return response()->json($requests,200);
    }
    public function trash()
    {
        $deleted=Clientrequest::onlyTrashed()->get();
        return response()->json($deleted,200);
    }
    public function restore($id){
        $clientrequest=Clientrequest::onlyTrashed()->findOrFail($id);
        $clientrequest->restore();
        return response()->json("Sucess",200);
    }
    public function force_delete($id){
        $clientrequest=Clientrequest::onlyTrashed()->findOrFail($id);
        $clientrequest->forceDelete();
        return response()->json("Destroied",201);
    }
    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(Clientrequest $clientrequest)
    { 
   
        return response()->json($clientrequest,200);
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clientrequest $clientrequest)
    {
        $clientrequest->delete();
        return response()->json(['status'=>'success','message'=>'delete success'],200);
    }
}
