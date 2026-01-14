<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::where('guard_name','web')->orderBy('name','ASC')->paginate(12);
        
        return Inertia::render('Admin/Role/ViewRoles',[
            'roles' =>$roles
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::where('guard_name','web')->orderBy('name','ASC')->get();
        
        return Inertia::render('Admin/Role/CreateRole',[
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
          'display_name'=>'required|unique:roles|min:3',
        ]);

        // dd($validator);
        if($validator->passes()){
            $role = Role::create([
                'display_name' => $request->display_name,
                'name'=> Str::slug($request->display_name),
            ]);

        if(!empty($request->permission)){
            foreach ($request->permission as $name){
                $role->givePermissionTo($name);
            }
        }
        return redirect()->route('role.index')->with('success','role added successfully');
        }else{
            return redirect()->route('role.create')->withInput()->withErrors($validator);
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
        dd($id);
        $role = Role::findOrFail($id);
        $hasPermissions = $role->permissions->pluck('name');
        $permissions = Permission::where('guard_name','web')->orderBy('name','ASC')->get();

        return Inertia::render('Admin/Role/EditRole',[
            'permissions' => $permissions,
            'hasPermissions'=> $hasPermissions,
            'role'=>$role
        ]);
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
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect()->route('role.index')->with('success','role deleted successfully');
    }
}
