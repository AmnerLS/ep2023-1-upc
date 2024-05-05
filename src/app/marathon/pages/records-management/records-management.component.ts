import { Component } from '@angular/core';
import {ParticipantListComponent} from "../../components/participant-list/participant-list.component";

@Component({
  selector: 'app-records-management',
  standalone: true,
  imports: [
    ParticipantListComponent
  ],
  templateUrl: './records-management.component.html',
  styleUrl: './records-management.component.css'
})
export class RecordsManagementComponent {

}
