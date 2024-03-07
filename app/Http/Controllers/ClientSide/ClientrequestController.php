<?php

namespace App\Http\Controllers\ClientSide;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Clientrequest;

class ClientrequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */


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
  
}
