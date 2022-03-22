<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;

class DestroyController extends Controller
{
    public function __invoke(Category $category)
    {
        $data = $category->category;

        $isDelete = $category->delete();

        if (!$isDelete) {
            return response(["messages" => "$data не удалось удалить"], 500);
        }
        return response(["messages" => "$data удален успешно"], 200);
    }
}
