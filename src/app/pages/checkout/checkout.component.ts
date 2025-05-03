import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AllordersComponent } from '../allorders/allorders.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly OrdersService = inject(OrdersService)
  private readonly router = inject(Router)

  cartId:string = "";

  checkoutForm!:FormGroup;

  ngOnInit():void{
    this.getInfo();
    this.getCardId();
  }
  getInfo():void{
    this.checkoutForm = this.formBuilder.group({
      details:[null,[Validators.required]],
      phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null,[Validators.required]],
    })
  }
  getCardId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId = param.get('id')!
      }
    })
  }

  submitForm():void{
    console.log(this.checkoutForm.value)
    this.OrdersService.checkout(this.cartId,this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          open(res.session.url ,'_self')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
