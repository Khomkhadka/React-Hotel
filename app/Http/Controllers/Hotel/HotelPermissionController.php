<?php

namespace App\Http\Controllers\Hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class HotelPermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
         $permissions = Permission::where('guard_name','staffs')
         ->when($search,fn($q)=>(
            $q->where('display_name','like',"%{$search}%")
         ))
         ->orderBy('display_name','ASC')
         ->paginate(10);
        return Inertia::render('Hotel/Permission/ViewPermissions',[
            'permissions' => $permissions
        ]+[
            'filters'=>$request->only('search')
        ]);
    }

   
}
