import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsIn, Matches, ValidatorConstraint, ValidatorConstraintInterface, Validate } from "class-validator";

@ValidatorConstraint({ name: 'passwordsMatch', async: false })
export class PasswordsMatchConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: any) {
        const obj = args.object as AddUserDTO;
        return obj.password === confirmPassword;
    }

    defaultMessage() {
        return 'password e confirmPassword non corrispondono';
    }
}

export class AddUserDTO {
    @IsString()
    @IsNotEmpty({ message: 'FirstName should not be empty or just spaces' })
    @Matches(/^[A-Za-zÀÈÉÌÒÙàèéìòù\s]+$/, { message: 'FirstName must only contain letters and spaces' })
    firstName: string;

    @IsString()
    @IsNotEmpty({ message: 'LastName should not be empty or just spaces' })
    @Matches(/^[A-Za-zÀÈÉÌÒÙàèéìòù\s]+$/, { message: 'LastName must only contain letters and spaces' })
    lastName: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Role should not be empty' })
    @IsIn(['dipendente', 'referente'], { message: 'Ruolo non valido' })
    role: string;

    @IsStrongPassword({
        minLength: 8
    })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'ConfirmPassword should not be empty' })
    @Validate(PasswordsMatchConstraint)
    confirmPassword: string;
}