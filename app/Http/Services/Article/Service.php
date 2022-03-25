<?php

namespace App\Http\Services\Article;

use App\Models\Article;
use App\Models\ContentImage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class Service
{
    public function store($data)
    {
        $image = $data['img_preview'];

        if(isset($data['img_preview'])) {
            $name = md5(Carbon::now() . '_' . $image->getClientOriginalName()) . '.' . $image->getClientOriginalExtension();
            $path = Storage::disk('public')->putFileAs('/images', $image, $name);
        }

        $newArticle = Article::create([
            'path_preview' => isset($path) ? $path : "",
            'url_preview' => isset($path) ? url('/storage/' . $path) : "",
            'article' => $data['article'],
            'description' => $data['description'],
        ]);

        return $newArticle;
    }

    public function update($article, $data)
    {
        if (isset($data['content'])) {

            if (isset($data['img_content_array'])) {
                $imagesContentCurrent = $data['img_content_array'];

                $imagesContentDelete = ContentImage::where('article_id', '=', $article->id)
                                                    ->whereNotIn('path', $imagesContentCurrent)
                                                    ->get();
            } else {
                $imagesContentDelete = ContentImage::where('article_id', '=', $article->id)->get();
            }

            foreach($imagesContentDelete as $imgDelete) {
                Storage::disk('public')->delete($imgDelete->path);
                $imgDelete->delete();
            }
            
            $article->update([
                'content' => $data['content'],
            ]);

            return $article;
        }

        
        if(isset($data['img_preview'])) {
            $image = $data['img_preview'];
            $currentImg = $article->path_preview;
            Storage::disk('public')->delete($currentImg);

            $name = md5(Carbon::now() . '_' . $image->getClientOriginalName()) . '.' . $image->getClientOriginalExtension();
            $path = Storage::disk('public')->putFileAs('/images', $image, $name);

            $article->update([
                'path_preview' => isset($path) ? $path : "",
                'url_preview' => isset($path) ? url('/storage/' . $path) : ""
            ]);
        }

        $article->update([
            'article' => $data['article'],
            'description' => $data['description'],
        ]);

        return $article;
    }
}
