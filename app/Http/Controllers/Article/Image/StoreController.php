<?php

namespace App\Http\Controllers\Article\Image;

use App\Http\Controllers\Article\Image\BaseController;
use App\Http\Requests\Article\Image\StoreRequest;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();

        $imageUrl = $this->service->store($data);

        return response()->json(['url' => $imageUrl]);
    }
}
