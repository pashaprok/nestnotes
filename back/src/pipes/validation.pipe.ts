import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

interface ValidationErrorI {
  validationProperty: string;
  validationErrors: string[];
}

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const validationObject = plainToClass(metadata.metatype, value);
    const errors: ValidationError[] = await validate(validationObject);

    if (errors.length) {
      const validationErrors: ValidationErrorI[] = errors.map(
        (err: ValidationError): ValidationErrorI => {
          return {
            validationProperty: err.property,
            validationErrors: Object.values(err.constraints),
          };
        },
      );
      throw new ValidationException(validationErrors);
    }

    return validationObject;
  }
}
