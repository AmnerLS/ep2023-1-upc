import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ParticipantsService} from "../../services/participants.service";
import {CentersService} from "../../services/centers.service";


@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './participant-list.component.html',
  styleUrl: './participant-list.component.css'
})
export class ParticipantListComponent {
  displayedColumns: string[] = ['id', 'first', 'last', 'center','ranking','record'];
  dataSource!: MatTableDataSource<any>;
  centerData: any;
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  constructor(private participantService: ParticipantsService,private centersService: CentersService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  private getAllParticipants() {
    this.participantService.getAll().subscribe((response:any)=>{
      this.dataSource.data =response;
      console.log(response);
    })
  }
  private getAllCenters() {
    this.centersService.getAll().subscribe((response:any)=>{
      this.centerData = response;
      console.log(this.centerData);
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  centerNameParticipant(element: any){
    const centerName = this.centerData.find((center: any) => center.id === element.centerId);
    return centerName ? centerName.name : '';
  }

  ngOnInit() {
    this.getAllParticipants();
    this.getAllCenters();
  }
}
