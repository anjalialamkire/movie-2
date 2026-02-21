import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Icourse } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
   CreateForm !: FormGroup

   isinEditMode : boolean = false
   editId !: string
  constructor(
    private _movieService : MovieService
  ) { }

  ngOnInit(): void {
    this.CreateCourseForm()
    this.patchData()
  }
   
 patchData(){
  this._movieService.editCourseObs$
  .subscribe(data =>{
    this.isinEditMode= true
    this.editId = data.id
    this.CreateForm.patchValue(data)
  })
 }
  
CreateCourseForm(){
  this.CreateForm = new FormGroup ({
      courseName : new FormControl(null,[Validators.required]),
      trainer : new FormControl(null,[Validators.required]),
      duration : new FormControl (null,[Validators.required]),
      fees : new FormControl(null,[Validators.required]),
      mode : new FormControl(null,[Validators.required])
      
  })
}

  onAddCourse(){
    if(this.CreateForm.valid){
      let create = this.CreateForm.value
      this._movieService.createCourse(create)
      .subscribe({
        next : res =>{
          this.CreateForm.reset()
          this._movieService.setNewCourse({...create,id: res.courseName})
        }
      })
    }
  } 

  onUpdate(){
    if(this.CreateForm.valid){
      let UPDATED_course :Icourse ={...this.CreateForm.value,id : this.editId}
      this._movieService.updateCourse(UPDATED_course)
      .subscribe({
        next : data =>{
          this.CreateForm.reset()
          this._movieService.setupdateCourse(UPDATED_course)
        }
      })
    }
     
    
  }
}

