import { Component, OnInit } from '@angular/core';
import { Denuncia } from 'src/app/models/denuncia';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DenunciaService } from 'src/app/services/denuncias.service';

@Component({
  selector: 'app-denuncia-detail',
  templateUrl: 'denuncia-detail.component.html',
  styleUrls: ['denuncia-detail.component.css']
})
export class DenunciaDetailComponent implements OnInit {
  
  denuncia: Denuncia | undefined;

  denunciaupdate: any = {
    userId:'',
    productId:'',
    date:'',
    gravity:'',
    desciption: ''
  }

  showUpdateForm = false;

  constructor(    
    private denunciaService: DenunciaService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getDenuncia();
  }
  getDenuncia(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    console.log(id);
    this.denunciaService.getDenuncia(id)
      .subscribe(denuncia => this.denuncia = denuncia);
  }
  delete() {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas borrar la denuncia?');
      if (isConfirmed) {
        const id = String(this.route.snapshot.paramMap.get('_id'));
        this.denunciaService.deleteDenuncia(id)
        .subscribe(denuncia => this.denuncia = denuncia);
        console.log('Denuncia borrada exitosamente');
        this.router.navigate(['denuncia']);
    }
  }

  update(): void {
    const id = String(this.route.snapshot.paramMap.get('_id'));
    this.denunciaService.updateDenuncia(id, this.denunciaupdate)
      .subscribe(updated => {
        this.router.navigate(['denuncia']);
        const popUp = window.alert('Denuncia actualizada');
        console.log('Denuncia actualizada exitosamente', updated);
      });
  }
  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
    if (!this.showUpdateForm) {

      this.denunciaupdate = {
        userId: '',
        productId: '',
        date: '',
        gravity: '',
        description:''
      };
    }
  }

  cancelUpdate() {
    this.showUpdateForm = false;
   
  }

}
