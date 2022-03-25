<?php

namespace App\Http\Services\Article\Image;

use App\Models\Article;
use App\Models\ContentImage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class Service
{
    public function store($data)
    {
        $image = $data['image'];

        if(isset($data['image'])) {
            $name = md5(Carbon::now() . '_' . $image->getClientOriginalName()) . '.' . $image->getClientOriginalExtension();
            $path = Storage::disk('public')->putFileAs('/images/content', $image, $name);

            ContentImage::create([
                'article_id' => $data['article_id'],
                'path' => $path
            ]);
        }

        $url = isset($path) ? url('/storage/' . $path) : "";

        return $url;
    }
}
