import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink ,FormsModule,SearchPipe,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)

  text:string ="";


  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    rtl:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    items:1,
    nav: true
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  products:IProduct[] = [];
  categories:ICategory[] = [];

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
  }

  getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res) =>{
        console.log(res.data);
        this.products = res.data;
      },
      error: (err)=>{
        console.log(err);
      },
    });
  }

  getCategoriesData():void{
    this.ngxSpinnerService.show('loading-2');
    this.categoriesService.getAllCategories().subscribe({
      next:(res) =>{
        console.log(res.data);
        this.categories = res.data;
        this.ngxSpinnerService.hide('loading-2');
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  addToCart(id:string):void{
    this.cartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message,'freshCart')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
