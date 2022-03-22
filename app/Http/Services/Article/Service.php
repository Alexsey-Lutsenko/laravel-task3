<?php

namespace App\Http\Services\Article;

use App\Models\Article;

class Service
{
    public function store($data)
    {
        return Article::create($data);
    }

    public function update($article, $data)
    {
        $article->update($data);

        return $article;
    }
}
