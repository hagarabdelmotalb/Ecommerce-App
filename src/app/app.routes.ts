import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { 
        path: '', 
        component: AuthLayoutComponent, 
        canActivate:[logedGuard],
        children: [
            { 
                path: 'login', 
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), 
                title: 'Login' 
            },
            { 
                path: 'register', 
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), 
                title: 'Register' 
            },
            { 
                path: 'forgetpassword', 
                loadComponent: () => import('./pages/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent), 
                title: 'Register' 
            },
        ]
    },

    { 
        path: '', 
        component: BlankLayoutComponent, canActivate:[authGuard],
        children: [
            { 
                path: 'home', 
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), 
                title: 'Home' 
            },
            { 
                path: 'cart', 
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), 
                title: 'Cart' 
            },
            { 
                path: 'brands', 
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), 
                title: 'Brands' 
            },
            { 
                path: 'categories', 
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), 
                title: 'Categories' 
            },
            { path: 'category/:id',
                loadComponent: () => import('./pages/specificcategory/specificcategory.component').then(m => m.SpecificcategoryComponent),
            },
            { 
                path: 'checkout/:id', 
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), 
                title: 'Checkout' 
            },
            { 
                path: 'products', 
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), 
                title: 'Products' 
            },
            {
                path: 'details/:id', 
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), 
                title: 'details' 
            },
            {
                path: 'allorders', 
                loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), 
                title: 'allorders' 
            },
            { 
                path: '**', 
                loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent) 
            },
        ]
    },
];

