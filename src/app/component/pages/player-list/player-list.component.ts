import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PlayerService } from 'src/app/services/api/player/player.service';
import { Player } from 'src/app/types/player.type';
import { CreatePlayerComponent } from '../../modal/create-player/create-player.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']

})
export class PlayerListComponent implements OnInit, OnDestroy {
  public players: Player[] = [];
  public seacrhVal = new Subject<any>();
  public page: number = 1;
  public isShowMore: boolean | undefined;

  constructor(
    public playerService: PlayerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.playerService.getPlayers(this.page++).subscribe(players => {
      this.isShowMore = players.headers.get("link")?.includes("next")
      this.players = players.body as Player[];
    });
    this.seacrhVal
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(value => {
          return this.playerService.searchPlayer(value)
        })
      )
      .subscribe(players => this.players = players);
  }

  ngOnDestroy() {
    this.seacrhVal.complete();
  }

  onSearch = (event: Event):void => {
    const target = event.target as HTMLInputElement;
    this.seacrhVal.next(target.value);
  }

  showMore = () => {
    this.playerService
      .getPlayers(this.page++)
      .subscribe(players => {
        this.isShowMore = players.headers.get("link")?.includes("next")
        this.players.push(...players.body as Player[]);
      });
  }

  openCreatePlayerModal = ():void => {
    const dialogRef = this.dialog.open(CreatePlayerComponent, {
      disableClose: true
    });
    dialogRef
      .afterClosed()
      .subscribe(data => {
        if (data.event === "submit") {
          this.players.push(data.player);
        }
      });
  }
}
