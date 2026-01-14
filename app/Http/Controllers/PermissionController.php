<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissions = Permission::
        orderBy('name','ASC')
        ->paginate(10);
        // ->withQueryString(); // keeps tab param during pagination
        return Inertia::render('Admin/Permission/ViewPermissions',[
            'permissions' => $permissions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Permission/CreatePermission');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'display_name'=> 'required|unique:permissions|min:3',
            'guard_name'=>'required|in:staffs,web',
        ]);
       
        if ($validator->passes()) {
            Permission::create([
                'display_name' => $request->display_name,
                'name'=>Str::slug($request->display_name),
                'guard_name'=>$request->guard_name
        ]);
            return redirect()->route('permission.index')->with('success','permission added successfully');
        }else{
             return redirect()->route('permission.create')->withInput()->withErrors($validator);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
