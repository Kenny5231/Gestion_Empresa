import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidationMethod } from '../../enums/validation-method.enum.js';
import { VerificationType } from '../../enums/verification-type.enum.js';

export class CreateVerificationEventDto {
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
      'Tipo de verificación; enum provisional pendiente del catálogo definitivo.',
    enum: VerificationType,
    example: VerificationType.IDENTITY,
  })
  verificationType!: VerificationType;

  @ApiProperty({
    description:
      'Método utilizado; enum provisional pendiente del catálogo definitivo.',
    enum: ValidationMethod,
    example: ValidationMethod.MANUAL,
  })
  validationMethod!: ValidationMethod;

  @ApiProperty({
    description: 'Resultado de la verificación.',
    example: true,
  })
  passed!: boolean;

  @ApiPropertyOptional({
    description:
      'Fecha y hora del evento en formato ISO 8601; por defecto se usa la hora de registro.',
    example: '2026-11-12T13:00:00.000Z',
    format: 'date-time',
  })
  occurredAt?: string;

  @ApiPropertyOptional({
    description: 'Información adicional estructurada del evento.',
    type: 'object',
    additionalProperties: true,
    example: { source: 'admin-panel' },
  })
  metadata?: Record<string, unknown>;
}
