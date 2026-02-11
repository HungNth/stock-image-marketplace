<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email|max:255',
            'password' => 'required|min:6|max:255',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
