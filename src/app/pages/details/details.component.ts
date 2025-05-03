import { Component, inject, OnInit ,HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  mainImage: string = ''; 
  isZoomOpen: boolean = false;
  zoomLevel: number = 1;
  productDetails: IProduct | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        const idProduct = p.get('id');
        if (!idProduct) {
          console.error("Product ID not found");
          return;
        }

        this.productsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            console.log(res);
            this.productDetails = res.data;
            this.mainImage = this.productDetails?.imageCover || '';
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  openZoom(): void {
    this.zoomLevel = 1;
    this.isZoomOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeZoom(): void {
    this.isZoomOpen = false;
    document.body.style.overflow = 'auto';
  }
  increaseZoom() {
    if (this.zoomLevel < 3) {
      this.zoomLevel += 0.1;
    }
  }

  decreaseZoom() {
    if (this.zoomLevel > 1) {
      this.zoomLevel -= 0.1;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(): void {
    this.closeZoom();
  }
}
