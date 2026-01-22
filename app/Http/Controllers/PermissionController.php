<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller implements HasMiddleware
{
     public static function middleware(): array
    {
        return [
               new Middleware('can:view-permission', only: ['index']),
               new Middleware('can:create-permission', only: ['create']),
               new Middleware('can:edit-permission', only: ['edit']),
               new Middleware('can:delete-permission', only: ['destroy']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $permissions = Permission::when($search,fn($q)=>(
            $q->where('display_name','like',"%{$search}%")
        ))
        ->orderBy('display_name','ASC')
        ->paginate(10);
        
        // ->withQueryString(); // keeps tab param during pagination
        return Inertia::render('Admin/Permission/ViewPermissions',[
            'permissions' => $permissions,
            'filters'=>$request->only('search')
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
        $permission = Permission::findOrFail($id);
         return Inertia::render('Admin/Permission/EditPermission',[
            'permission' => $permission
         ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        $permission = Permission::findOrFail($id);
          $validator = Validator::make($request->all(),[
            'display_name'=> 'required|unique:permissions,display_name,'.$id.',id|min:3',
            // 'guard_name'=>'required|in:staffs,web',
        ]);
        
        if ($validator->passes()) {
            // Permission::create(['name' => $request->name]);
            $permission->display_name = $request->display_name;
            $permission->name = Str::slug($request->display_name);
            
            $permission->save();
            return redirect()->route('permission.index')->with('success','permission updated successfully');
        }else{
             return redirect()->route('permission.edit',$id)->withInput()->withErrors($validator);
        }
         
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $permission = Permission::findOrFail($id);
         $permission->delete();
         return redirect()->route('permission.index')->with('success','permission deleted successfully');
    }
}
