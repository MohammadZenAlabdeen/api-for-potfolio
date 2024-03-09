<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\Service;

class DashboardServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'=>'string|required',
            'desc'=>'string|required',
        ]);
        $service=new Service();
        $service->title=$request->input('title');
        $service->desc=clean($request->input('desc'));
        $service->save();
        if($request->hasFile('imgs')){
            $imageTable= new Image;
            foreach ($request->file('imgs') as $img) {
                $imageName= time() . '.' . $img->getClientOriginalName();
            $img->move(public_path('images'),$imageName);
            $imageTable->img=$imageName;
            $service->images()->save($imageTable->replicate());
            }
        }
        return response()->json(['status'=>'success','message'=>'stored successfuly'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        $service->join($service,$service->images);
        return response()->json($service,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        if(Service::where('id',$service->id)->exists()){
        $request->validate([
            'title'=>'string|required',
            'desc'=>'string|required',
        ]);
        $service->title=$request->input('title');
        $service->desc=clean($request->input('desc'));
        $service->save();
        if($request->hasFile('imgs')){
            $imageTable= new Image;
            foreach ($request->file('imgs') as $img) {
                $imageName= time() . '.' . $img->getClientOriginalName();
            $img->move(public_path('images'),$imageName);
            $imageTable->img=$imageName;
            $service->images()->save($imageTable->replicate());
            }
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
