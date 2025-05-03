import { Component, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IOrders } from '../../shared/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {

  private readonly ordersService = inject(OrdersService)
  private readonly activatedRoute = inject(ActivatedRoute);

  // orders:IOrders = {} as IOrders;
  orders: IOrders[] = [];
  cartId: string = '';

  ngOnInit(): void {
    this.getCompletedOrders();
  }

  getCompletedOrders(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (res) => {
        console.log('Filtered Orders:', this.orders);
        const allOrders = res.data as IOrders[];
        this.orders = allOrders.filter(order =>
          (order as any).cartId === this.cartId // <-- هنا الفلترة الصح
        );
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!;
        this.getCompletedOrders();
      }
    });
  }
}
