import { registerDecorator, ValidationOptions, ValidationArguments, isUUID } from "class-validator";

export function IsUUID(validationOptions?: ValidationOptions) {
  let customValidationOptions: ValidationOptions = {};

  if (validationOptions) {
    customValidationOptions = validationOptions;
  }

  customValidationOptions.context = { errorCode: "1003" };

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsUUID",
      target: object.constructor,
      propertyName: propertyName,
      options: customValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isUUID(value);
        },
        defaultMessage(args: ValidationArguments) {
          return "Isn't a valid UUID";
        },
      },
    });
  };
}
