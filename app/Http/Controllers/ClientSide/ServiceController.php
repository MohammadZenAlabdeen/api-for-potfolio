<?php

namespace App\Http\Controllers\ClientSide;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services=Service::all();
        foreach($services as $service){
            $service->join($service,$service->images);
        }
        return response()->json($services,200);
    }

}
