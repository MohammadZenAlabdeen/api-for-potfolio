<?php

namespace App\Http\Controllers\ClientSide;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Section;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections=Section::all();
        foreach($sections as $section){
            $section->join($section,$section->images);
        }
        return response()->json($sections,200);
    }

    /**
     * Store a newly created resource in storage.
     */
 
}
