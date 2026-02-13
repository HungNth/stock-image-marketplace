<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Stripe API Key
    |--------------------------------------------------------------------------
    |
    | This value is the API key for your Stripe account. You can set this
    | in your ".env" file to keep it secure and out of your source code.
    |
    */

    'stripe_secret_key' => env('STRIPE_API_SECRET_KEY', ''),
];
