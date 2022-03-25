<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $guarded = false;

    public function contentImages() {
        return $this->belongsToMany(ContentImage::class, 'article_id', 'id');
    }
}
