<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;

class ReviewController extends Controller
{
    /**
     * Display all reviews.
     */
    public function index()
    {
        $reviews = Review::latest()->get();
        return view('admin.reviews.index', [
            'reviews' => $reviews,
        ]);
    }

    /**
     * Approve and disapprove reviews.
     */
    public function toggleReviewsStatus(Review $review, $status)
    {
        $review->update([
            'approved' => $status,
        ]);

        return redirect()->route('admin.reviews.index')
            ->with('success', 'Review has been updated successfully.');
    }

    /**
     * Delete a review.
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('admin.reviews.index')
            ->with('success', 'Review has been deleted successfully.');
    }
}
