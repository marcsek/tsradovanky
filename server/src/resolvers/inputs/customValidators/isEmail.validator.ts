import { registerDecorator, ValidationOptions, ValidationArguments, isEmail } from "class-validator";

export function IsEmail(validationOptions?: ValidationOptions) {
  let customValidationOptions: ValidationOptions = {};

  if (validationOptions) {
    customValidationOptions = validationOptions;
  }

  customValidationOptions.context = { errorCode: "1003" };

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsEmail",
      target: object.constructor,
      propertyName: propertyName,
      options: customValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isEmail(value);
        },
        defaultMessage(args: ValidationArguments) {
          return "Isn't a valid email";
        },
      },
    });
  };
}
