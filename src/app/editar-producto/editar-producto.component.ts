import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent {
  producto: Producto = new Producto(); 
  id: number;
  constructor(private toastr: ToastrService,private productoServicio: ProductoService, private ruta: ActivatedRoute, private enrutador: Router ){

  }
  ngOnInit(){
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductoPorId(this.id).subscribe(
      {
        next: (datos) => {
          this.producto = datos;
          
        },
        error: (errores:any) => {
          console.log(errores)
        }
      }  
    );
  }

  onSubmit(){
    this.guardarProducto();
  }
  guardarProducto(){
    this.productoServicio.actualizarProducto(this.producto.idProducto, this.producto).subscribe(
      {
        next: (datos) => {
          this.irProductoLista();
          this.showSuccess();

        },error: (error: any) => {
          console.log(error);
        }
      }
  );
  }
  irProductoLista(){
    this.enrutador.navigate(['/productos']);
  }

  showSuccess() {
    this.toastr.success('Producto Actualizado', 'Toastr fun!');
  }


}
