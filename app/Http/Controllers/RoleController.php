<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller implements HasMiddleware
{
     public static function middleware(): array
    {
        return [
               new Middleware('can:view-role', only: ['index']),
               new Middleware('can:create-role', only: ['create']),
               new Middleware('can:edit-role', only: ['edit']),
               new Middleware('can:delete-role', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $roles = Role::with('permissions')
        ->where('guard_name','web')
        ->orderBy('name','ASC')
        ->when($search,fn($q)=>(
            $q->where('display_name','like',"%{$search}%")
        ))
        ->paginate(12);
        
        return Inertia::render('Admin/Role/ViewRoles',[
            'roles' =>$roles,
            'filters'=>$request->only('search')
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
        // dd($request);
        $validator = Validator::make($request->all(),[
          'display_name'=>'required|unique:roles|min:3',
        ]);

        // dd($validator);
        if($validator->passes()){
            $role = Role::create([
                'display_name' => $request->display_name,
                'name'=> Str::slug($request->display_name),
            ]);

        if(!empty($request->permissions)){
            foreach ($request->permissions as $name){
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
        // dd($request);
         $role = Role::findOrFail($id);
           $validator = Validator::make($request->all(),[
            'display_name'=> 'required|unique:roles,name,'.$id.'|min:3' 
        ]);
        if ($validator->passes()) {
           
          $role->display_name = $request->display_name;
          $role->name = Str::slug($request->display_name);
          $role->save();
            if (!empty($request->permissions)){
                if ($request->permissions){
                   $role->syncPermissions($request->permissions);

                }else{
                     $role->syncPermissions([]);
                }

            }
            return redirect()->route('role.index')->with('success','role updated successfully');
        }else{
             return redirect()->route('role.edit',$id)->withInput()->withErrors($validator);
        }
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
