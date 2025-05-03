import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-specificcategory',
  imports: [],
  templateUrl: './specificcategory.component.html',
  styleUrl: './specificcategory.component.scss'
})
export class SpecificcategoryComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)

 
  noProductsFound = false;

  categoryId: string | null = null;
  category: any = null;
  categoryProducts: any[] = [];


  constructor() {}

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.categoryId) {
      this.getCategoryInfo(this.categoryId);
      this.getProductsByCategory(this.categoryId);
    }
  }

  getCategoryInfo(id: string): void {
    this.categoriesService.getSpecificCategory(id).subscribe({
      next: (res) => {
        this.category = res.data;
      },
      error: (err) => console.error(err)
    });
  }

  getProductsByCategory(categoryId: string): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        const filtered = res.data.filter(
          (product: any) => product.category._id === categoryId
        );
  
        this.categoryProducts = filtered;
        this.noProductsFound = filtered.length === 0;
      },
      error: (err) => {
        console.error(err);
        this.noProductsFound = true;
      }
    });
  }
  
  
}
