<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;

class OrderController extends Controller
{
    /**
     * Display all orders.
     */
    public function index()
    {
        $orders = Order::latest()->get();
        return view('admin.orders.index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Delete a order.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('success', 'Order has been deleted successfully.');
    }
}
