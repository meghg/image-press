import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { 
      path: 'auth', 
      loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule) 
    }, 
    { 
      path: 'gallery', 
      loadChildren: () => import ('./gallery/gallery.module').then(m => m.GalleryModule)
    },
    {
         path: '', 
         redirectTo: 'gallery', 
         pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}