<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\User;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
     public static function middleware(): array
    {
        return [
               new Middleware('can:view-user', only: ['index']),
               new Middleware('can:create-user', only: ['create']),
               new Middleware('can:edit-user', only: ['edit']),
               new Middleware('can:delete-user', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
         $users = User::orderBy('name','ASC')
         ->when($search,fn($q)=>(
            $q->where('name','like',"%{$search}%")
         ))
         ->paginate(10);
         $roles = Role::where('guard_name','web')
         ->orderBy('name','ASC')->get();
        return Inertia::render('Admin/User/ViewUsers',[
            'users' => $users,
            'roles'=>$roles,
            'filters'=>$request->only('search')
        ]);
    }

       public function admindashboard(){
        $hotels=Hotel::latest()->get();
        $users=User::latest()->get();
       
        return Inertia::render('Dashboard',compact('hotels','users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::where('guard_name','web')->orderBy('name','ASC')->get();
        return Inertia::render('Admin/User/CreateUser',[
            'roles' => $roles,
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'address' => 'required|string|max:255',
        'contact' => 'required|string|min:10|max:20',
        'dob' => 'nullable|date',
        'password' => 'required|confirmed|min:6',
        'role' => 'required|exists:roles,name',
        'status' => 'required|in:active,inactive',
        'remark' => 'nullable|string|max:500',
    ]);

    // Create User
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'address' => $request->address,
        'contact' => $request->contact,
        'dob' => $request->dob,
        'password' => Hash::make($request->password),
        'status' => $request->status,
        'remark' => $request->remark,
    ]);

    $user->assignRole($request->role);


    return redirect()->route('users.index')->with('success', 'User created successfully.');

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
        $user = User::findOrFail($id);
        $roles = Role::where('guard_name','web')->orderBy('name','ASC')->get();
        return Inertia::render('Admin/User/EditUser',[
            'user'=> $user,
            'roles'=>$roles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        $user = User::findOrFail($id);
         $data = $request->validate([
            'name' => 'required|string|min:3|max:255',
             'email'=>'required|email|string|unique:users,email,'.$id.',id',
             'address' => 'required|string|max:500',
             'contact' => 'required|string|min:10|max:15',
             'password' => 'nullable|string|min:5|confirmed', 
             'role' => 'required|exists:roles,name',
             'status' => 'required|string|in:active,inactive',
             'dob' => 'nullable|date',
             'remarks' => 'nullable|string|max:500', 
        ]);
        if (!empty($data['password'])) {
        $data['password'] = Hash::make($data['password']);
         } else {
        unset($data['password']);
         }
         $user->update($data);
         
         $user->syncRoles($request->role);
        //  dd($request->role);
        
         return redirect()
        ->route('users.index')
        ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
         return redirect()->route('users.index')->with('success','role deleted successfully');
    }
}
