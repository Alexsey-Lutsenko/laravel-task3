<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentImage extends Model
{
    use HasFactory;

    protected $guarded = false;

    public function article() {
        return $this->belongsTo(Article::class, 'article_id', 'id');
    }
}
