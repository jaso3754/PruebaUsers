import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})


export class UserComponent implements OnInit {

  formulario: FormGroup;
  listUser: User [] = [];

  constructor( private fb: FormBuilder ,private userservice: UserService) { 

    this.formulario = this.fb.group ({

      name: [''],
      email:[''],
      phone: [''],
      address: [''],
      
    })
  }

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers (){
  this.userservice.getAll().subscribe((res:any) => {
    this.listUser = this.listUser.slice(0,5);
    console.log(res);
    
  })
  }




}
