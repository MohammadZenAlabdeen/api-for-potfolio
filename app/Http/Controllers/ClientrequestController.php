<?php

namespace App\Http\Controllers;

use App\Models\Clientrequest;
use Illuminate\Http\Request;

class ClientrequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests=Clientrequest::all();
        return response()->json($requests,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $clientrequest=new Clientrequest();
        $request->validate([
            'name'=>'string |required',
            'email'=>'string|required',
            'desc'=>'string|required'
        ]);
        $clientrequest->name=$request->input('name');
        $clientrequest->email=$request->input('email');
        $clientrequest->desc=$request->input('desc');
        $clientrequest->save();
        return response()->json(['status' => 'success'],200);
    }

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
