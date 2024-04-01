<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Image;
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
            $allLinks=[];

            if($request->has('links')){
                foreach($request->input('links') as $link){
                    array_push($allLinks,$link);
                }
                $section->links=implode(' ',$allLinks);
            }
            $section->save();
            if($request->hasFile('imgs')){
                $imageTable= new Image;
                foreach ($request->file('imgs') as $img) {
                    $imageName= time() . '.' . $img->getClientOriginalName();
                $img->move(public_path('images'),$imageName);
                $imageTable->img=$imageName;
                $section->images()->save($imageTable->replicate());
                }

            }

            return response()->json(['status' => $section],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        $section->join($section,$section->images);
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
                $section->desc=clean($request->input('desc'));
                $allLinks=[];

                if($request->has('links')){
                    foreach($request->input('links') as $link){
                        array_push($allLinks,$link);
                    }
                    $section->links=implode(' ',$allLinks);
                }
                $section->save();
                if ($request->hasFile('imgs')) {
                    // Delete existing images related to the section
                    $section->images()->delete();
                
                    // Upload and save new images
                    foreach ($request->file('imgs') as $img) {
                        $imageName = time() . '_' . $img->getClientOriginalName();
                        $img->move(public_path('images'), $imageName);
                
                        // Create a new Image model instance for each image
                        $image = new Image();
                        $image->img = $imageName;
                
                        // Save the image record associated with the section
                        $section->images()->save($image);
                    }
                }
                return response()->json([
                    'status' => 'success',
                    'message' => 'updated succesfully',
                    'images' => $request->file('imgs')
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
