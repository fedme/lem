import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App routes
const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'game', loadChildren: './game/game.module#GamePageModule' },
  { path: 'exp-notes', loadChildren: './exp-notes/exp-notes.module#ExpNotesPageModule' },
  { path: 'end', loadChildren: './end/end.module#EndPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
