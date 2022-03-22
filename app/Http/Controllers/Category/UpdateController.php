<?php

namespace App\Http\Controllers\Category;

use App\Http\Requests\Category\UpdateRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class UpdateController extends BaseController
{
    public function __invoke(UpdateRequest $request, Category $category)
    {
        $data = $request->validated();

        $categoryUpdate = $this->service->update($category, $data);

        return new CategoryResource($categoryUpdate);
    }
}
