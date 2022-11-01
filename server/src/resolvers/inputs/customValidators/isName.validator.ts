import { registerDecorator, ValidationOptions, ValidationArguments, minLength, maxLength } from "class-validator";

export function IsName(validationOptions?: ValidationOptions) {
  let customValidationOptions: ValidationOptions = {};

  if (validationOptions) {
    customValidationOptions = validationOptions;
  }

  customValidationOptions.context = { errorCode: "1003" };

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsName",
      target: object.constructor,
      propertyName: propertyName,
      options: customValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return maxLength(value, 15) && minLength(value, 2);
        },
        defaultMessage(args: ValidationArguments) {
          return "Name doesn't meet requirements";
        },
      },
    });
  };
}
