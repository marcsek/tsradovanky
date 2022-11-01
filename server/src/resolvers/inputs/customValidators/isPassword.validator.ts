import { registerDecorator, ValidationOptions, ValidationArguments, minLength, maxLength, matches } from "class-validator";

export function IsPassword(validationOptions?: ValidationOptions) {
  let customValidationOptions: ValidationOptions = {};

  if (validationOptions) {
    customValidationOptions = validationOptions;
  }

  customValidationOptions.context = { errorCode: "1003" };

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPassword",
      target: object.constructor,
      propertyName: propertyName,
      options: customValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return minLength(value, 8) && maxLength(value, 40) && matches(value, /^(?=.*\d)(?=.*[a-z]).{8,40}$/);
        },
        defaultMessage(args: ValidationArguments) {
          return "Password doesn't meet requirements";
        },
      },
    });
  };
}
