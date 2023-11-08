import { Component, OnInit } from '@angular/core';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaService } from 'src/app/services/denuncias.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-denuncia',
  templateUrl: 'denuncia.component.html',
  styleUrls: ['denuncia.component.css']
})
export class DenunciaComponent implements OnInit{
  denuncias: Denuncia[] = [];

  denuncia: any = {
   userId: '',
   date: '',
   productId: '',
   gravity: '',
   description: ''
 } 
 currentPage: number = 1; // Página actual
  totalPages: number = 1; // Número total de páginas
  showAddForm: boolean = false;

 constructor(
   private denunciaService: DenunciaService,
   private router: Router,
   private dialog: MatDialog
   ) { }
 
 //Ordena obtener los 'denuncias' cuando se inicializa la pagina
 ngOnInit(): void {
   this.getDenuncias(this.currentPage);
 }
 // Obtiene los 'purchases' proporcionados por el purchaseService
 getDenuncias(page:number): void {
   this.denunciaService.getDenuncias(page)
   .subscribe((response: any) => {
    this.denuncias = response.docs;
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
  });
   
 }
 //adddenunciamethod
 add() {
   this.denunciaService.addDenuncia(this.denuncia).subscribe((response) => {
     // You can perform actions after adding the denuncia here
     console.log('denuncias added:', response);
     // Clear the input fields after adding
    this.denuncia = {
      userId: '',
      date: '',
      productId: '',
      gravity: '',
      description:''
    };
   },
   (error) => {
    // Denuncia failed
    console.error('Denuncia failed:', error);
    // Show a failure notification
      // Clear the input fields after adding
      this.denuncia = {
        userId: '',
        date: '',
        productId:'',
        gravity: '',
        quantity: ''
      };
  });
 }

 showForm() {
  this.showAddForm = true;
}
toggleFormVisibility() {
  this.showAddForm = !this.showAddForm;
}

previousPage() {
  if (this.currentPage > 1) {
    this.getDenuncias(this.currentPage - 1);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.getDenuncias(this.currentPage + 1);
  }
}

}
