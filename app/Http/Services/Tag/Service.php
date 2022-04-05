<?php

namespace App\Http\Services\Tag;

use App\Models\Category;

class Service
{
    public function store($data)
    {
        return Category::create($data);
    }

    public function update($tag, $data)
    {
        $tag->update($data);

        return $tag;
    }
}
