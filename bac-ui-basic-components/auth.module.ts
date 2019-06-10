import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { LoginModuleSharedLibsModule } from 'app/bac-ui-basic-components/shared/shared-libs.module';

@NgModule({
  declarations: [SigninComponent],
  imports: [FormsModule, AuthRoutingModule, LoginModuleSharedLibsModule]
})
export class AuthModule {}
