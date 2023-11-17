import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home/:categoriaId',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'add-comentario',
    loadChildren: () => import('./pages/add-comentario/add-comentario.module').then( m => m.AddComentarioPageModule)
  },
  {
    path: 'add-comentario/:id',
    loadChildren: () => import('./pages/add-comentario/add-comentario.module').then( m => m.AddComentarioPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'cadastro/:id',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'info-assistenciais',
    loadChildren: () => import('./pages/info-assistenciais/info-assistenciais.module').then( m => m.InfoAssistenciaisPageModule)
  },
  {
    path: 'add-info-assistenciais',
    loadChildren: () => import('./pages/add-info-assistenciais/add-info-assistenciais.module').then( m => m.AddInfoAssistenciaisPageModule)
  },
  {
    path: 'add-info-assistenciais/:id',
    loadChildren: () => import('./pages/add-info-assistenciais/add-info-assistenciais.module').then( m => m.AddInfoAssistenciaisPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
