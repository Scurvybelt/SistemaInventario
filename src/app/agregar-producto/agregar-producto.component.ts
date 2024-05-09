import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {
  producto: Producto = new Producto();


  constructor(private productoServicio: ProductoService, private enrutador: Router){
    
  }

  onSubmit(){
    this.guardarProducto();
    // console.log(this.producto);
  }

  guardarProducto(){
    this.productoServicio.agregarProducto(this.producto).subscribe(
      {
        next: (datos) => {
          //redirigo a la lista de productos
          this.irListaProductos();
          
          

        },
        error: (error: any) => {console.log(error)}
      }
    )
  }

  irListaProductos(){
    this.enrutador.navigate(['/productos']);
  }
}
