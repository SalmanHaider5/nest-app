export class CreateUserDto {
  readonly username: string;
  readonly password: string;
}

export class LoginDto {
  readonly username: string;
  readonly password: string;
}