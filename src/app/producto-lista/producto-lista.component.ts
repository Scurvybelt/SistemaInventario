import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html'
})
export class ProductoListaComponent {
  productos: Producto[] = [];
  constructor(private toastr: ToastrService,private productoServicio: ProductoService, private enrutador: Router){
    
  }
  
  ngOnInit(){
    //cargamos los productos
    this.obtenerProductos();
  }

  private obtenerProductos(){
    //Consumir los datos del observable( suscribirnos)
    this.productoServicio.obtenerProductosLista().subscribe(datos => {
      this.productos = datos;
      
    });
  }

  editarProducto(id: number){
    this.enrutador.navigate(['/editar-producto', id]);
  }

  eliminar(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
    {
      next: (datos) => {
        this.obtenerProductos();
        this.showSuccess();

      },error: error =>{
        console.log(error);
      }   
    });
  }
  
  showSuccess() {
    this.toastr.success('Producto eliminado', 'Eliminado con exitos');
  }
  
}
