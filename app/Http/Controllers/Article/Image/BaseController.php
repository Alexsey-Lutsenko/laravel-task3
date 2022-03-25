<?php

namespace App\Http\Controllers\Article\Image;

use App\Http\Controllers\Controller;
use App\Http\Services\Article\Image\Service;

class BaseController extends Controller
{
    public $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }
}
