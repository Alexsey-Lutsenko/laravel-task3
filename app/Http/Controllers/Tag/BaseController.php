<?php

namespace App\Http\Controllers\Tag;

use App\Http\Services\Tag\Service;

class BaseController
{
    public $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }
}
