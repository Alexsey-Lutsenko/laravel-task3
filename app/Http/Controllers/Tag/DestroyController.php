<?php

namespace App\Http\Controllers\Tag;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class DestroyController extends Controller
{
    public function __invoke(Tag $tag)
    {
        $data = $tag->tag;

        $isDelete = $tag->delete();

        if (!$isDelete) {
            return response(["messages" => "$data не удалось удалить"], 500);
        }
        return response(["messages" => "$data удален успешно"], 200);
    }
}
