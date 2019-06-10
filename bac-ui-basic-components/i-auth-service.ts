export interface IAuthService {
  login(user: string, pass: string, isRemember: boolean): Promise<any>;
}
