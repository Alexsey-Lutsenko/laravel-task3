<?php

namespace App\Http\Controllers\Category;

use App\Http\Requests\Category\StoreRequest;
use App\Http\Resources\Category\CategoryResource;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();

        $category = $this->service->store($data);

        return new CategoryResource($category);
    }
}
