<?php

namespace App\Http\Controllers\Hotel;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $hotelId = auth('hotels')->id();
        $search = $request->input('search');
        $bookings = Booking::where('hotel_id',$hotelId)->with(['customers','packages','hotels'])
        ->orderBy('name','ASC')
         ->when($search,fn($q)=>(
                        $q->whereHas('customers',fn($c)=>(
                $c->where('customer_name','like',"%{$search}%")
            ))

        ))
        ->paginate(5);
        // dd($bookings)
       return Inertia::render('Hotel/Booking/ViewBookings',compact('bookings')+[
        'filters'=>$request->only('search')
       ]);
    }

    public function trashShow()
    {
        $hotelId = auth('hotels')->id();
        $bookings = Booking::onlyTrashed()->with(['customers','packages','hotels'])->latest()->paginate(5);

        return Inertia::render('Hotel/Booking/SoftDelete', [
            'bookings' => $bookings,
            
        ]);
    }
    public function restore($id)
    {
        $bookings = Booking::onlyTrashed()->findOrFail($id);

        $bookings->restore();

        return redirect()
            ->route('hotel_bookings.index')
            ->with('success', 'Booking restored successfully');
    }
    public function forceDelete($id)
    {
        $bookings = Booking::onlyTrashed()->findOrFail($id);

        $bookings->forceDelete();

        return redirect()
            ->route('hotel_bookings.trash')
            ->with('success', 'Booking deleted permanently');
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hotelId = auth('hotels')->id();
        $customers = Customer::where('hotel_id',$hotelId)->get();
        $packages = Package::where('hotel_id',$hotelId)->get();
         return Inertia::render('Hotel/Booking/CreateBooking',[
            'hotelId'=>$hotelId,
            'customers'=>$customers,
            'packages'=>$packages
         ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
          $data =  $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'hotel_id' => 'required|exists:hotels,id',
            'package_id' => 'required|exists:packages,id',
            'booked_date' => 'required|date',
            'checkin' => 'required|date|after_or_equal:booked_date',
            'checkout' => 'required|date|after:checkin',
            'note' => 'required|string',
        ]);

        Booking::create($data);
        return redirect()->route('hotel_bookings.index')->with('success','booking created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $hotelId = auth('hotels')->id();
        $customers = Customer::where('hotel_id',$hotelId)->orderBy('customer_name','ASC')->get();
        $packages = Package::where('hotel_id',$hotelId)->orderBy('name','ASC')->get();
        $booking = Booking::findOrFail($id);
        return Inertia::render('Hotel/Booking/EditBooking',[
            'booking'=>$booking,
            'hotelId'=>$hotelId,
            'customers'=>$customers,
            'packages'=>$packages
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
          $booking = Booking::findOrFail($id);        
        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'hotel_id' => 'required|exists:hotels,id',
            'package_id' => 'required|exists:packages,id',
            'booked_date' => 'required|date',
            'checkin' => 'required|date|after_or_equal:booked_date',
            'checkout' => 'required|date|after:checkin',
            'note' => 'required|string',
        ]);
        $booking->update($data);
        return redirect()->route('hotel_bookings.index')->with('success','Booking updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $booking=Booking::findOrFail($id);  
        $booking->delete();
        return redirect()->route('hotel_bookings.index')->with('success','Booking deleted');
    }
}
