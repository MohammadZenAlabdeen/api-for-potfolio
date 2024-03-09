<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Service extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'desc',
    ];
    public function images() : MorphMany{
        return $this->morphMany(Image::class , 'imgs');
    }
}
