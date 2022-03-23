<?php

namespace App\Http\Controllers\Tag;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tag\UpdateRequest;
use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(UpdateRequest $request, Tag $tag)
    {
        $data = $request->validated();

        $tagUpdate = $this->service->update($tag, $data);

        return new TagResource($tagUpdate);
    }
}
