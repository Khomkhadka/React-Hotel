<?php

namespace App\Http\Controllers\Hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HotelRoleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $hotel = Auth::guard('hotels')->user();
        // $roles = Role::with('permissions')->where('hotel_id', $hotel->id)->where('guard_name', 'staffs')->orderBy('name', 'ASC')->paginate(10);
        // dd($roles->name);
        $roles = $hotel->roles()
        ->when($search,fn($q)=>(
            $q->where('display_name','like',"%{$search}%")
        ))
        ->orderBy('name','ASC')
        ->paginate(10);
        
        return Inertia::render('Hotel/Role/ViewRoles', [
            'roles' => $roles,
        ]+[
            'filters'=>$request->only('search')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::orderBy('name', 'ASC')->where('guard_name', 'staffs')->get();
        return Inertia::render('Hotel/Role/CreateRole', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'display_name' => 'required|min:3',
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name'
            ]);
            // dd($validator);
        if ($validator->passes()) {

            // $slug = Str::slug($request->display_name);
                $slug = "hotel-". Auth::guard('hotels')->user()->id . "-".Str::slug($request->display_name);
            
        
            $role = Role::create([
                'display_name' => $request->display_name,
                'name' => $slug,
                'guard_name' => 'staffs',
            ]);

            // $permission = $request->permission ?? [];
            if (!empty($request->permissions)) {
                foreach ($request->permissions as $name) {
                    $role->syncPermissions($name);
                }
            }
            $hotel = Auth::guard('hotels')->user();

            $hotel->roles()->attach($role->id);

            //    $hotel_id = Auth::guard('hotels')->user()->id;
            // $role->hotels()->attach($hotel_id);
            return redirect()->route('hotel_roles.index')->with('success', 'roles added successfully');
        } else {
            return redirect()->route('hotel_roles.create')->withInput()->withErrors($validator);
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
        $permissions = Permission::orderBy('name', 'ASC')->where('guard_name', 'staffs')->get();

        return Inertia::render('Hotel/Role/EditRole', [
            'permissions' => $permissions,
            'hasPermissions' => $hasPermissions,
            'role' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = Role::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'display_name' => 'required|unique:roles,name,' . $id . '|min:3',
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);
       
        if ($validator->passes()) {
            $role->display_name = $request->display_name;
            $role->name = Str::slug($request->display_name);
            $role->save();
            if (!empty($request->permissions)) {
                if ($request->permissions) {
                    $role->syncPermissions($request->permissions);
                } else {
                    $role->syncPermissions([]);
                }
            }
            return redirect()->route('hotel_roles.index')->with('success', 'role updated successfully');
        } else {
            return redirect()->route('hotel_roles.edit', $id)->withInput()->withErrors($validator);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect()->route('hotel_roles.index')->with('success', 'role deleted successfully');
    }
}
