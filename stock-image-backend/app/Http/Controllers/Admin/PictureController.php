<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Picture;
use App\Models\Review;

class PictureController extends Controller
{
    /**
     * Display all pictures.
     */
    public function index()
    {
        $pictures = Picture::latest()->get();
        return view('admin.pictures.index', [
            'pictures' => $pictures,
        ]);
    }

    /**
     * Change the status of the picture.
     */
    public function togglePictureStatus(Picture $picture, $status)
    {
        $picture->update([
            'status' => $status,
        ]);

        return redirect()->route('admin.pictures.index')
            ->with('success', 'Picture has been updated successfully.');
    }
}
