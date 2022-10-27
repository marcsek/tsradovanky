import { registerDecorator, ValidationOptions, ValidationArguments, isHexColor, isRgbColor } from "class-validator";

export function IsColor(validationOptions?: ValidationOptions) {
  let customValidationOptions: ValidationOptions = {};

  if (validationOptions) {
    customValidationOptions = validationOptions;
  }

  customValidationOptions.context = { errorCode: "1003" };

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsColor",
      target: object.constructor,
      propertyName: propertyName,
      options: customValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isRgbColor(value) || isHexColor(value);
        },
        defaultMessage(args: ValidationArguments) {
          return "Incorrect color format";
        },
      },
    });
  };
}
