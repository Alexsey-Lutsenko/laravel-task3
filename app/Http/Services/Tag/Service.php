<?php

namespace App\Http\Services\Tag;

use App\Models\Tag;

class Service
{
    public function store($data)
    {
        return Tag::create($data);
    }

    public function update($tag, $data)
    {
        $tag->update($data);

        return $tag;
    }
}
