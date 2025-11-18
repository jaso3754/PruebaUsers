
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})


export class UserComponent implements OnInit {
  
  formulario: FormGroup;
  AddressFormulario: FormGroup;
  GeoFormulario: FormGroup; 
  listUser: User [] = [];

  constructor( private fb: FormBuilder ,private userservice: UserService) { 

    // creacion de formularios
    this.formulario = this.fb.group ({
      
      name: ['', Validators.required ],
      email:['', [Validators.required, Validators.email]],
      phone: ['', Validators.required ],
      address: ['', Validators.required],
      
    })

    this.AddressFormulario = this.fb.group ({
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
    })

    this.GeoFormulario = this.fb.group ({
      lat: ['', Validators.required],
      lng: ['', Validators.required],
  
    })

  }
  
  ngOnInit(): void {
    this.getUsers();
    this.getId(2);
  }
  
  getUsers (){
    
    this.userservice.getAll().subscribe((res:any) => {
      this.listUser = res;
      
      
        const list5: any[] = [];

      // metodo para obtener los 5 primeros usuarios
      for (let i=0; i < this.listUser.length && i < 5; i ++) {
        list5.push(this.listUser[i])
      }
      
      this.listUser = list5;
      console.log('Aqui mostramos la lista de los 5 primeros', this.listUser);

       
      
    })
  }
  
  getId (id:number) {
    this.userservice.getID(id).subscribe((res) => {
    console.log(res);
      
    })
  }
  
  createUser() {
    // validacion para no crear formulario vacio o invalidos 
      if (this.formulario.valid && this.AddressFormulario.valid && this.GeoFormulario.valid) {
        const geo = {
      lat: this.GeoFormulario.value.lat,
      lng: this.GeoFormulario.value.lat,
    }

    // constantes creando los datos de formulario 
    const address = {
    street: this.AddressFormulario.value.street,
    suite: this.AddressFormulario.value.suite,
    city: this.AddressFormulario.value.city,
    zipcode: this.AddressFormulario.value.zipcode,
    geo: geo,

    }
    const userp = {
      id: 0,
      name: this.formulario.value.name,
      email: this.formulario.value.email,
      phone: this.formulario.value.phone,
      address: address,
    }

     this.userservice.createUser(userp).subscribe( (res) => {
      console.log('la informacion se ha enviado correctamente', res);
      
     })
    } else {
      console.log('formulario invalido');
      
    }
    
    
 
  }
  

}
