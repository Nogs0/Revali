<?php

namespace App\Console;

use App\Http\Middleware\JwtMiddlewareAdm;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
    protected $routeMiddleware = [
        // ...
        'auth.jwt' => \Tymon\JWTAuth\Http\Middleware\Authenticate::class,
        'doador.jwt' => \App\Http\Middleware\JwtMiddlewareDoador::class,
        'adm_banco.jwt' => \App\Http\Middleware\JwtMiddlewareAdmBancoDeAlimentos::class,
        'adm.jwt' => \App\Http\Middleware\JwtMiddlewareAdm::class,
    ];
    
}
