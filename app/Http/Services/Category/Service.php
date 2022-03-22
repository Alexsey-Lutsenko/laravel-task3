<?php

namespace App\Http\Services\Category;

use App\Models\Category;

class Service
{
    public function store($data)
    {
        return Category::create($data);
    }

    public function update($category, $data)
    {
        $category->update($data);

        return $category;
    }
}
