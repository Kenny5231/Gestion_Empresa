import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LedgerTxType } from '../../enums/ledger-tx-type.enum.js';

export class CreateLedgerTransactionDto {
  @ApiProperty({
    description: 'Referencia única de la transacción.',
    example: 'INV-2026-001',
  })
  reference!: string;

  @ApiProperty({
    description:
      'Tipo de movimiento; enum provisional pendiente del catálogo definitivo.',
    enum: LedgerTxType,
    example: LedgerTxType.CREDIT,
  })
  type!: LedgerTxType;

  @ApiProperty({
    description: 'Importe entero positivo en unidades menores (por ejemplo, centavos).',
    example: 12550,
    minimum: 1,
    type: Number,
  })
  amountMinorUnits!: number;

  @ApiPropertyOptional({
    description: 'Código de moneda de tres letras en mayúsculas.',
    example: 'USD',
    minLength: 3,
    maxLength: 3,
  })
  currency?: string;

  @ApiPropertyOptional({
    description: 'Descripción opcional del movimiento.',
    example: 'Pago de factura',
  })
  description?: string;

  @ApiPropertyOptional({
    description:
      'Fecha y hora de la transacción en formato ISO 8601; por defecto se usa la hora de registro.',
    example: '2026-11-12T13:00:00.000Z',
    format: 'date-time',
  })
  occurredAt?: string;
}
