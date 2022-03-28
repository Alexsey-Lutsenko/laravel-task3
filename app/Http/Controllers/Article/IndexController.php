<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use App\Http\Resources\Article\ArticleResource;
use App\Http\Requests\Article\FilterRequest;
use App\Http\Filters\ArticleFilter;
use App\Models\Article;

class IndexController extends Controller
{
    public function __invoke(FilterRequest $request)
    {
        $data = $request->validated();

        $filter = app()->make(ArticleFilter::class, ['queryParams' => array_filter($data)]);

        $articles = Article::filter($filter)->oldest()->get();

        return ArticleResource::collection($articles);
    }
}
