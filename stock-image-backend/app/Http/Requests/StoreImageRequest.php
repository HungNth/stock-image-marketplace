<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'price' => 'required|integer',
            'user_id' => 'required|integer',
            'category_id' => 'required|integer',
        ];
    }
    
    public function authorize(): bool
    {
        return true;
    }
    
    public function messages(): array
    {
        return [
            'category_id.required' => 'The category field is required.',
            'category_id.integer' => 'The category field must be a valid integer.',
        ];
    }
}
