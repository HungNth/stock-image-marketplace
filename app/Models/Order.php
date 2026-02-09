<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = ['total', 'user_id', 'picture_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function picture(): BelongsTo
    {
        return $this->belongsTo(Picture::class);
    }
}
