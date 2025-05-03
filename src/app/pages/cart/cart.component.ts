import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink ,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  
  cartDetails:Icart = {} as Icart;

  ngOnInit():void{
    this.getCartData();
  }

  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  deletItemFromCart(id:string):void{
    console.log("hello")
    this.cartService.deletSpecificItem(id).subscribe({
      next:(res)=>{
        console.log('hello')
        console.log(res);
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  CountOfItem(id:string,count:number):void{
    this.cartService.updateSpecificItem(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  clearCart(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed){
        this.cartService.clearCartService().subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.cartDetails = {} as Icart;
              Swal.fire({
                title: "Deleted!",
                text: "Your cart has been cleared.",
                icon: "success"
              });
            }
            this.getCartData();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
  
}
