import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslationService {

  private renderer2: Renderer2;

  constructor(private translateService:TranslateService ,
   @Inject(PLATFORM_ID) private id:object,
  private renderer:RendererFactory2 ) {

    this.renderer2 = renderer.createRenderer(null,null);
    
    if(isPlatformBrowser(this.id)){
         this.translateService.setDefaultLang('en')
         
         const savedLang  = localStorage.getItem('lang'); 

         if(savedLang){
           this.translateService.use(savedLang!);
         }
         this.changeDirection()
    }

   }


   changeDirection():void {
    if(localStorage.getItem('lang') === 'en'){
      this.renderer2.setAttribute( document.documentElement ,'dir','ltr')
      this.renderer2.setAttribute( document.documentElement ,'lang','en')
    }
    else if (localStorage.getItem('lang') === 'ar') {
      this.renderer2.setAttribute( document.documentElement ,'dir','rtl')
      this.renderer2.setAttribute( document.documentElement ,'lang','ar')
    }
   }


   changeLang(lang : string):void {
      if(isPlatformBrowser(this.id)){
        localStorage.setItem('lang'  , lang);
      }

      this.translateService.use(lang);
      this.changeDirection();
   } 
   changLangTranslate(lang:string):void{
    localStorage.setItem('lang',lang),
    this.translateService.use(lang),
    this.changeDirection()
   }
}
