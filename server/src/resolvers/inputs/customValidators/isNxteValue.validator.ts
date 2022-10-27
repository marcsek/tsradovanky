import { registerDecorator, ValidationOptions, ValidationArguments, maxLength } from "class-validator";

export function IsNxteValue(validationOptions?: ValidationOptions) {
  let customValidationOptions: ValidationOptions = {};

  if (validationOptions) {
    customValidationOptions = validationOptions;
  }

  customValidationOptions.context = { errorCode: "1003" };

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsNxteValue",
      target: object.constructor,
      propertyName: propertyName,
      options: customValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return maxLength(value, 250);
        },
        defaultMessage(args: ValidationArguments) {
          return "Value is too long";
        },
      },
    });
  };
}
