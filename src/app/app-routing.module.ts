import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './component/pages/game-list/game-list.component';
import { PlayerListComponent } from './component/pages/player-list/player-list.component';
import { PlayerComponent } from './component/pages/player/player.component';
import { NotFoundComponent } from './component/pages/not-found/not-found.component';

const routes: Routes = [
  {path: 'players', component: PlayerListComponent}, 
  {path: "players/:id", component: PlayerComponent},
  {path: 'games', component: GameListComponent},
  {path: '', redirectTo: '/players', pathMatch: 'full'},
  {path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
