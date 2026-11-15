import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidationMethod } from '../enums/validation-method.enum.js';
import { VerificationType } from '../enums/verification-type.enum.js';

export class VerificationEvent {
  @ApiProperty({
    description: 'Identificador único del evento.',
    example: 'b207e752-4468-4bea-9e6a-7206eab47273',
    format: 'uuid',
  })
  id!: string;

  @ApiProperty({
    description: 'Tipo de recurso o entidad verificada.',
    example: 'employee',
  })
  resourceType!: string;

  @ApiProperty({
    description: 'Identificador del recurso verificado.',
    example: 'employee-104',
  })
  resourceId!: string;

  @ApiProperty({
    description:
      'Tipo de verificación. Opciones provisionales hasta acordar el catálogo del dominio.',
    enum: VerificationType,
    example: VerificationType.IDENTITY,
  })
  verificationType!: VerificationType;

  @ApiProperty({
    description:
      'Método utilizado. Opciones provisionales hasta acordar el catálogo del dominio.',
    enum: ValidationMethod,
    example: ValidationMethod.MANUAL,
  })
  validationMethod!: ValidationMethod;

  @ApiProperty({
    description: 'Indica si la verificación fue satisfactoria.',
    example: true,
  })
  passed!: boolean;

  @ApiProperty({
    description: 'Fecha y hora del evento en formato ISO 8601.',
    example: '2026-11-12T13:00:00.000Z',
    format: 'date-time',
  })
  occurredAt!: string;

  @ApiPropertyOptional({
    description: 'Información adicional estructurada del evento.',
    type: 'object',
    additionalProperties: true,
    example: { source: 'admin-panel' },
  })
  metadata?: Record<string, unknown>;
}
