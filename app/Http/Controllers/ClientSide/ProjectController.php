<?php

namespace App\Http\Controllers\ClientSide;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\Project;

use function PHPSTORM_META\map;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects=Project::all();
        foreach($projects as $project){

                $project->join($project,$project->images);
            
        }
        return response()->json($projects,200);
    }

    /**
     * Store a newly created resource in storage.
     */

}
