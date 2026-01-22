<?php

namespace App\Http\Controllers\Hotel;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $hotelId = auth('hotels')->id();
        $search = $request->input('search');

        $packages = Package::where('hotel_id',$hotelId)
        ->orderBy('name','ASC')
        ->when($search,fn($q)=>(
            $q->where('name','like',"%{$search}%")
        ))
        ->paginate(6);
        // dd($packages);
        return Inertia::render('Hotel/Package/ViewPackages',compact('packages')+[
            'filters'=>$request->only('search')
        ]);
    }
    public function trashShow()
    {
        $hotelId = auth('hotels')->id();
        $packages = Package::onlyTrashed()->where('hotel_id', $hotelId)->latest()->paginate(5);

        return Inertia::render('Hotel/Package/SoftDelete', [
            'packages' => $packages
        ]);
    }
    public function restore($id)
    {
        $packages = Package::onlyTrashed()->findOrFail($id);

        $packages->restore();

        return redirect()
            ->route('hotel_packages.index')
            ->with('success', 'Packages restored successfully');
    }
    public function forceDelete($id)
    {
        $packages = Package::onlyTrashed()->findOrFail($id);

        $packages->forceDelete();

        return redirect()
            ->route('hotel_packages.trash')
            ->with('success', 'Package deleted permanently');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         $hotelId = auth('hotels')->id();
        return Inertia::render('Hotel/Package/CreatePackage', [
            'hotelId'=> $hotelId
        ]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $data = $request->validate([
            'name' =>'required|string|min:3|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:active,inactive',
            'hotel_id' => 'nullable|integer|exists:hotels,id',
        ]);
        Package::create($data);
        return redirect()->route('hotel_packages.index')->with('success','package created'); 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        //   $package = Package::findOrFail($id);
        // return view('Hotel.hotel_packages.show',[
        //     'package'=> $package
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
         $package = Package::findOrFail($id);
        $hotelId = auth('hotels')->id();
        return Inertia::render('Hotel/Package/EditPackage',[
            'package'=>$package,
            'hotelId'=>$hotelId
           ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $package = Package::findOrFail($id);
        $data = $request->validate([
            'name' =>'required|string|min:3|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:active,inactive',
            'hotel_id' => 'nullable|integer|exists:hotels,id',
        ]);
        $package->update($data);
        return redirect()->route('hotel_packages.index')->with('success','package updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $package=Package::findOrFail($id);
        $package->update(['status' => 'inactive']);
        $package->delete();
        return redirect()->route('hotel_packages.index')->with('success','package deleted');
    }
}
