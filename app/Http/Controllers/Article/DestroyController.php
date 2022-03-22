<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use App\Http\Requests\Article\StoreRequest;
use App\Http\Resources\Article\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;

class DestroyController extends Controller
{
    public function __invoke(Article $article)
    {
        $data = $article->article;

        $isDelete = $article->delete();

        if (!$isDelete) {
            return response(["messages" => "$data не удалось удалить"], 500);
        }
        return response(["messages" => "$data удален успешно"], 200);
    }
}
