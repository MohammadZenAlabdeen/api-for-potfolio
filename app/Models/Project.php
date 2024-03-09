<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'link',
        'desc',
    ];
    public function images() : MorphMany{
        return $this->morphMany(Image::class , 'imgs');
    }
}
