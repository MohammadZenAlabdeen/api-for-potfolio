<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Mews\Purifier\Purifier;
class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services=Service::all();
        return response()->json($services,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'img'=>'image',
            'title'=>'string|required',
            'desc'=>'string|required',
        ]);
        $service=new Service();
        $service->title=$request->input('title');
        $service->desc=clean($request->input('desc'));
        if($request->hasFile('img')){
            $image = $request->file('img');
            $imageName= time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'),$imageName);
            $service->img=$imageName;
        }
        $service->save();
        return response()->json(['status'=>'success','message'=>'stored successfuly'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return response()->json($service,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        if(Service::where('id',$service->id)->exists()){
        $request->validate([
            'img'=>'image',
            'title'=>'string|required',
            'desc'=>'string|required',
        ]);
        $service->title=$request->input('title');
        $service->desc=clean($request->input('desc'));
        if($request->hasFile('img')){
            $image = $request->file('img');
            $imageName= time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'),$imageName);
            $service->img=$imageName;
        }
        return response()->json(['status'=>'success','message'=>'stored successfuly'],200);}else{
            return response()->json(['status'=>'failed','message'=>'not found'],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['status'=>'success','message'=>'deleted successfuly'],200);
    }
}
