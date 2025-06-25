import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name!: string;

    @IsEmail({}, { message: 'El correo no es válido' })
    email!: string;

    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string;

    @IsOptional()
    @IsIn(['user', 'admin'], { message: 'El rol debe ser user o admin' })
    role?: string;
}
