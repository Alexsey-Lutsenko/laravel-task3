<?php

namespace App\Http\Controllers\Tag;

use App\Http\Requests\Tag\StoreRequest;
use App\Http\Resources\Tag\TagResource;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();

        $tag = $this->service->store($data);

        return new TagResource($tag);
    }
}
