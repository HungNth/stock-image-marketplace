<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Order;
use App\Models\User;
use ErrorException;
use Illuminate\Http\Request;
use Stripe\Stripe;

class OrderController extends Controller
{
    /**
     * Store new order
     */
    public function store(Request $request)
    {
        $data = [];
        $user = User::findOrFail($request->user_id);

        foreach ($request->pictures as $picture) {
            $data['user_id'] = $user->id;
            $data['picture_id'] = $picture['id'];
            $data['total'] = $this->calculateOrderTotal($request->pictures, $savingForDatabase = true);

            // save the data
            $order = Order::create($data);
            // return the response
            return response()->json([
                'user' => UserResource::make($user),
            ]);
        }
    }

    /** Pay order via stripe */
    public function payByStripe(Request $request)
    {
        Stripe::setApiKey('sk_test_xxxxx');
        try {
            // Create a PaymentIntent with amount and currency
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $this->calculateOrderTotal($request->cartItems, $savingForDatabase = false),
                'currency' => 'usd',
                'description' => 'React Stock Images',
                'setup_future_usage' => 'on_session',
            ]);

            $output = [
                'clientSecret' => $paymentIntent->client_secret,
            ];
            return response()->json($output);

        } catch (ErrorException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    /**
     * Calculate the total amount
     */
    public function calculateOrderTotal($pictures, $savingForDatabase)
    {
        $total = 0;

        foreach ($pictures as $picture) {
            $total += $picture['price'];
        }

        return $savingForDatabase ? $total : $total * 100;
    }
}
