import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslationService } from '../../core/services/myTranslate/my-translate.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogen = input<boolean>(true)

  private readonly _AuthService = inject(AuthService)
  private readonly myTranslationService = inject(MyTranslationService)
  private readonly translateService = inject(TranslateService)

  logoutBtn():void{
    this._AuthService.logout();
  }

  change(lang:string){
    this.myTranslationService.changLangTranslate(lang);
  }
  currentLang(lang:string):boolean{
    return this.translateService.currentLang === lang;
  }
}
