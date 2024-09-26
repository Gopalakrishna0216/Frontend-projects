
import { Component, EventEmitter, Optional, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LcServiceService } from '../lcservice.service';



@Component({
  selector: 'app-lc-form',
  templateUrl: './lc-form.component.html',
  styleUrls: ['./lc-form.component.scss']
})
export class LcFormComponent {

  

  title = 'lc_F_end';

  loginform: FormGroup;
  submitted: boolean = false;
  user: any[] = [];
  editinguserId: number | null = null;
  userId: any;
  formGroup: any;
  //editinguserId: boolean = false 
  //editinguserId:number | null =null;

  //@Output() datasubmitted: EventEmitter<any[]> = new EventEmitter<any[]>();
   
  places = [{ value:'chennai',viewValue:'Chennai'},
            { value:'bangalore',viewValue :'Bangalore'},
            { value:'hyderabad',viewValue:'Hyderabad'},
            { value:'trivandrum',viewValue:'Trivandrum'}
  ]


  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email', 'dob', 'gender','place', 'actions']

  constructor(public lcLcServiceService: LcServiceService) {

    this.loginform = new FormGroup({
      userId: new FormControl(null),
      firstName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("^[A-Za-z]+$")]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern("^[A-Za-z]+$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      place: new FormControl('',[Validators.required])
    })


  }

  ngOnInit() {
    this.getApi();
  }

  getApi() {
    this.lcLcServiceService.crudGet().subscribe((X: any) => {
      console.log(JSON.stringify(X))
      this.user = X

    })
  }


  submit() {
    this.submitted = true;
    console.log(this.loginform.status)
    console.log(this.loginform.errors)
    console.log(this.loginform.value)
    if (this.loginform.valid) {
      let input =
      {

        firstName: this.loginform.controls["firstName"].value,
        lastName: this.loginform.controls["lastName"].value,
        email: this.loginform.controls["email"].value,
        dob: this.loginform.controls["dob"].value,
        gender: this.loginform.controls["gender"].value,
        place: this.loginform.controls["place"].value
      };

      if (this.editinguserId !== null) {
        // Only add userId if it's an update operation
        (input as any).userId = this.loginform.controls["userId"].value;
        this.lcLcServiceService.crudPut(this.editinguserId, input).subscribe({

          next: (response: any) => {
            alert("User updated successfully")
            this.loginform.reset();
            this.resetForm();
            this.getApi();

          },
          error: (err: any) => {
            console.error("Error occurred while updating user", err);
            alert(`Error occurred: ${err.message || err.error?.title || 'Unknown error'}`);
          },
        })
      }

      else {

        this.lcLcServiceService.crudPost(input).subscribe({

          next: (response: any) => {

            // If the post request is successful, show the alert and reset the form
            alert("User created successfully");
            this.loginform.reset();
            this.submitted = false
            this.resetForm();
            this.user.push(response)

            // this.user.push(response)
            //  this.datasubmitted.emit(this.user)
          },
          error: (err: any) => {
            console.error("Error occurred while creating form", err);
            alert(`Error occurred: ${err.message || err}`);
          }
        });
      }
    }

    else {
      alert("Form is invalid");
    }

  }



  edit(userId: number) {
    let selecteduser = this.user.find(U => U.userId === userId);
    if (selecteduser) {
      this.loginform.patchValue({
        userId: selecteduser.userId,
        firstName: selecteduser.firstName,
        lastName: selecteduser.lastName,
        email: selecteduser.email,
        dob: selecteduser.dob,
        gender: selecteduser.gender,
        place:selecteduser.place
      });
      this.editinguserId = userId;
    }
  }


  delete(userId: number) {
    if (confirm("Are you sure you want delete this Id")) {
      this.lcLcServiceService.crudDelete(userId).subscribe({
        next: () => {
          alert("User deleted successfully");
          this.getApi();


        },

        error: (err: any) => {
          console.error("Error occured while deleting user", err)
          alert(`Error occured:${err.message || err}`)
        }
      })

    }
  }

  resetForm() {
    this.loginform.reset();
    this.submitted = false;
    this.editinguserId = null;
  }


  get firstName() {
    return this.loginform.get("firstName")
  }

  get lastName() {
    return this.loginform.get("lastName")
  }

  get email() {
    return this.loginform.get("email")
  }

  get dob() {
    return this.loginform.get("dob")
  }
  get gender() {
    return this.loginform.get("gender")
  }
  get place(){
    return this.loginform.get("place")
  }
}

