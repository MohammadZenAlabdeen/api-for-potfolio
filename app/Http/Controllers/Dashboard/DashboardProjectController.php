<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\Project;

class DashboardProjectController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $project=new Project();
        $request->validate([
            'title'=>'string|required',
            'desc'=>'string|required',
            'link'=>'string|required',
        ]);
        $project->title=$request->input('title');
        $project->desc=clean($request->input('desc'));
        $project->link=$request->input('link');

        $project->save();
        if($request->hasFile('imgs')){
            $imageTable= new Image;
            foreach ($request->file('imgs') as $img) {
                $imageName= time() . '.' . $img->getClientOriginalName();
            $img->move(public_path('images'),$imageName);
            $imageTable->img=$imageName;
            $project->images()->save($imageTable->replicate());
            }
        }
        return response()->json($project,200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->join($project,$project->images);
        return response()->json($project,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        if(Project::where('id',$project->id)->exists()){
            $request->validate([
                'title'=>'string|required',
                'desc'=>'string|required',
                'link'=>'string|required',
            ]);
            $project->title=$request->input('title');
            $project->desc=clean($request->input('desc'));
            $project->link=$request->input('link');

            $project->save();
            if($request->hasFile('imgs')){
                $imageTable= new Image();
                foreach ($request->file('imgs') as $img) {
                    $imageName= time() . '.' . $img->getClientOriginalName();
                $img->move(public_path('images'),$imageName);
                $imageTable->img=$imageName;
                $project->images()->save($imageTable->replicate());
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'project updated successfully',
            ],201);}else{
                return response()->json([
                    'status' => 'fail',
                    'message' => 'problem',
                ],404);
    }}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['status'=>'success','message'=>'deleted'],200);
    }
}
