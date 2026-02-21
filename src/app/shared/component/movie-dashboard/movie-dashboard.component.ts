import { Component, OnInit } from '@angular/core';
import { Icourse } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {
  courseArr :Array<Icourse> =[]

  constructor(private _MovieService : MovieService) { }

  ngOnInit(): void {
    this.getMovies()
    this.getAddCourse()
    this.getRemoveMovies()
    this.getUpdateMovie()
  }
  

getUpdateMovie(){
  this._MovieService.updateCourseObse$
  .subscribe(course =>{
    let getIndex = this.courseArr.findIndex(p => p.id === course.id)
    this.courseArr[getIndex]=course
  })
}


getRemoveMovies(){
  this._MovieService.removeCourseObs$
  .subscribe(id =>{
    let getIndex = this.courseArr.findIndex(p => p.id === id)
    this.courseArr.splice(getIndex,1)
  })
}


  getAddCourse(){
    this._MovieService.NewCourseObs$
    .subscribe({
      next :(newCourse) =>{
        this.courseArr.unshift(newCourse)
      }
    })
  }
 
  getMovies(){
    this._MovieService.fetchCourse()
    .subscribe({
      next : data =>{
        this.courseArr = data
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }
}
