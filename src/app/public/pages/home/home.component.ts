import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ParticipantsService} from "../../../marathon/services/participants.service";
import {Participant} from "../../../marathon/model/participant.entity";
import {CentersService} from "../../../marathon/services/centers.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  participantWinner: Participant;
  centersData: any;

  constructor(private participantsService: ParticipantsService, private centersService: CentersService) {
    this.participantWinner= {} as Participant;

  }

  private getWinner() {
    this.participantsService.getByParam('ranking', 1).subscribe((response:any)=>{
        this.participantWinner = response[0];
    })
  }
  private getCenters(){
    this.centersService.getAll().subscribe((response:any)=>{
      this.centersData = response;
    })
  }

  centerName(){
    const center = this.centersData.find((center:any)=>center.id === this.participantWinner.centerId);
    return center ? center.name : '';
  }

  ngOnInit() {
    this.getWinner();
    this.getCenters();
  }
}
