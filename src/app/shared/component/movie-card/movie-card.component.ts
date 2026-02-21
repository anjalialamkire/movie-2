import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Icourse } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
@Input() courseObj !: Icourse
  constructor(
    private _MatDialog :MatDialog,
    private _MovieService : MovieService
  ) { }

  ngOnInit(): void {
  } 

  onRemove(){
    let matConfig = new MatDialogConfig
    matConfig.width = '400px'

    matConfig.data = `Are You Sure, you want to Remove The Course with id ${this.courseObj.id}`

    let matDialogRef = this._MatDialog.open(GetConfirmComponent,matConfig)
    matDialogRef.afterClosed()
        .pipe(
          filter(res => res === true),
          switchMap(() =>{
            return this._MovieService.removeCourse(this.courseObj.id)
          }) 
        )

        .subscribe({
          next : data =>{
           console.log(data); 
           this._MovieService.removeCourse(this.courseObj.id)
          },
          error : err =>{
            console.log(err);
            
          }
        })
  }
   

 onEdit(){
  this._MovieService.setEditCourse(this.courseObj)
 }

}
