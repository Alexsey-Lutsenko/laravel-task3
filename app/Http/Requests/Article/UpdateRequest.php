<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'article' => 'filled|string|max:255',
            'description' => 'string',
            'content' => 'string',
            'img_content_array' => '',
            'img_preview' => '',
            'is_publish' => 'filled|numeric'
        ];
    }
}
