<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;

trait UploadTrait
{
    public function singlefileUpload($file, $table, $name, $folder = 'images')
    {

        $ext = $file->getClientOriginalExtension();
        $name = str_replace(" ", "_", $name);
        $name = uniqid($name . '_', true);
        $file = $file->move($folder . "/" . $table, $name . "_" . time() . "." . $ext);

        return $file;
    }
}