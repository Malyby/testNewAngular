//Module
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
//Сomponent
import { CreatePlayerComponent } from './component/modal/create-player/create-player.component';
import { GameListComponent } from './component/pages/game-list/game-list.component';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { NotFoundComponent } from './component/pages/not-found/not-found.component';
import { PlayerListComponent } from './component/pages/player-list/player-list.component';
import { PlayerComponent } from './component/pages/player/player.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { EditPlayerComponent } from './component/modal/edit-player/edit-player.component';
import { AddGameComponent } from './component/modal/add-game/add-game.component';
import { DeletePlayerComponent } from './component/modal/delete-player/delete-player.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    PlayerListComponent,
    GameListComponent,
    PlayerComponent,
    NotFoundComponent,
    CreatePlayerComponent,
    EditPlayerComponent,
    AddGameComponent,
    DeletePlayerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
