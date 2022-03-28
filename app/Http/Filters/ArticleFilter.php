<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class ArticleFilter extends AbstractFilter
{
    public const ID = 'id';
    public const IS_PUBLISH = 'is_publish';

    protected function getCallbacks(): array
    {
        return [
            self::ID => [$this, 'id'],
            self::IS_PUBLISH => [$this, 'is_publish'],
        ];
    }

    public function id(Builder $builder, $value)
    {
        $builder->where('id', '=', $value);
    }

    public function is_publish(Builder $builder, $value)
    {
        $builder->where('is_publish', '=', $value);
    }
}
