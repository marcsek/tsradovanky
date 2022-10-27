import { registerDecorator, ValidationOptions, ValidationArguments, maxLength } from "class-validator";

export function IsNxteTitle(validationOptions?: ValidationOptions) {
  let customValidationOptions: ValidationOptions = {};

  if (validationOptions) {
    customValidationOptions = validationOptions;
  }

  customValidationOptions.context = { errorCode: "1003" };

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsNxteTitle",
      target: object.constructor,
      propertyName: propertyName,
      options: customValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return maxLength(value, 50);
        },
        defaultMessage(args: ValidationArguments) {
          return "Title is too long";
        },
      },
    });
  };
}
