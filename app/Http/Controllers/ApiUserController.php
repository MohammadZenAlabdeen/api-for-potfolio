<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class ApiUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required| email',
            'password' =>'required'
        ]);
        $user=User::where('email',$credentials['email'])->first();
        if(!$user ||!Hash::check($credentials['password'],$user->password)){
            return response()->json(
                [
                    'status'=>'failed',
                    'message' =>'wrong info or does not exist',
                ],401
            );
        }
        $token= $user->createToken($credentials['email'])->plainTextToken;
        $response=[
            'status' => 'success',
            'message' => 'user logged in successfully',
            'data' => [
                'token' => $token,
                'user' => $user,
            ],
        ];
        return response()->json($response,201);
    }
    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' =>'success',
            'message' => 'user is logged out successfully'
        ],200);
    }
}
