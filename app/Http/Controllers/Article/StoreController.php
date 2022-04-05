<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use App\Http\Requests\Article\StoreRequest;
use App\Http\Resources\Article\ArticleResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();

        $user = Auth::user();

        if($user->hasAllPermissions(['create articles'])) {
            $article = $this->service->store($data, $user);
        }

        return new ArticleResource($article);
    }
}
