<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\CategoryGame;

class listgame_category extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:listgame_category';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        echo CategoryGame::all()->toJson();
    }
}
