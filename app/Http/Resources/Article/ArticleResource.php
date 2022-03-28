<?php

namespace App\Http\Resources\Article;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'article' => $this->article,
            'description' => $this->description,
            'content' => $this->content,
            'url_preview' => $this->url_preview,
            'is_publish' => $this->is_publish,
            'user_id' => $this->user_id,
            'user' => $this->user->name
        ];
    }
}
