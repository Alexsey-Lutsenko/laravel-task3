<?php

namespace App\Http\Controllers\Category;

use App\Http\Services\Tag\Service;

class BaseController
{
    public $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }
}
