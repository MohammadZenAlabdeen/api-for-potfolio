<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Section;

class DashboardSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

            $section=new Section();
            $section->title=$request['title'];
            $section->desc=clean($request->input('desc'));

            

            $allImages=null;
            $allLinks=null;
            if($request->hasFile('imgs')){
                foreach ($request->file('imgs') as $img) {
                    $imageName= time() . '.' . $img->getClientOriginalName();
                $img->move(public_path('images'),$imageName);
                $allImages .= $allImages == null ? $imageName : ';' . $imageName;
                }
                $section->imgs=$allImages;
            }

            if($request->has('links')){
                foreach($request->input('links') as $link){
                    $allLinks .= $allLinks == null ? $link : ';' . $link;
                }
                $section->links=$allLinks;
            }

            $section->save();
            return response()->json(['status' => 'success'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        return response()->json($section,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {

        if(Section::where('id',$section->id)->exists()){
            $request->validate(
                [
                    'title' => 'string',
                    'desc' => 'string',

                ]
                );
                
                $section->title=$request->title;
              /*   dd($request); */
                $section->desc=clean($request->input('desc'));
                $allImages=null;
                $allLinks=null;
                if($request->hasFile('imgs')){
                    foreach ($request->file('imgs') as $img) {
                        $imageName= time() . '.' . $img->getClientOriginalName();
                    $img->move(public_path('images'),$imageName);
                    $allImages .= $allImages == null ? $imageName : ';' . $imageName;
                    }
                    $section->imgs=$allImages;
                }

                if($request->has('links')){
                    foreach($request->input('links') as $link){
                        $allLinks .= $allLinks == null ? $link : ';' . $link;
                    }
                    $section->links=$allLinks;
                }
                $section->save();
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'updated succesfully',
                ],201);}else{
                    return response()->json([
                        'status' => 'fail',
                        'message' => 'problem',
                    ],404);
                }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();
        return response()->json(['status'=>'success','message'=>'section deleted successfully',],201);
    }
}
