import { registerDecorator, ValidationOptions, ValidationArguments, isDate } from "class-validator";

export function IsDate(validationOptions?: ValidationOptions) {
  let customValidationOptions: ValidationOptions = {};

  if (validationOptions) {
    customValidationOptions = validationOptions;
  }

  customValidationOptions.context = { errorCode: "1003" };

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsDate",
      target: object.constructor,
      propertyName: propertyName,
      options: customValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isDate(value);
        },
        defaultMessage(args: ValidationArguments) {
          return "Incorrect date format";
        },
      },
    });
  };
}
