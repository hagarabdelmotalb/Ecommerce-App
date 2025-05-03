import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink} from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [TranslatePipe ,SearchPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)

  products: any[] = [];
  searchText: string = '';

  constructor() {}


  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  addToCartBtn(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        if(res.status === 'success'){
          this.toastrService.success(res.message,'freshCart')
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
