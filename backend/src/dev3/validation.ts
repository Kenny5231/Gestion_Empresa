import { BadRequestException } from '@nestjs/common';

export function assertRecord(
  value: unknown,
): asserts value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new BadRequestException('El cuerpo debe ser un objeto JSON.');
  }
}

export function requiredText(
  record: Record<string, unknown>,
  field: string,
): string {
  const value = record[field];
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new BadRequestException(`"${field}" es obligatorio.`);
  }
  return value.trim();
}

export function optionalText(
  record: Record<string, unknown>,
  field: string,
): string | undefined {
  const value = record[field];
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new BadRequestException(`"${field}" debe ser texto no vacío.`);
  }
  return value.trim();
}

export function enumValue<T extends string>(
  value: unknown,
  allowedValues: readonly T[],
  field: string,
): T {
  if (
    typeof value !== 'string' ||
    !allowedValues.includes(value as T)
  ) {
    throw new BadRequestException(`"${field}" contiene un valor inválido.`);
  }
  return value as T;
}

export function optionalIsoDate(
  record: Record<string, unknown>,
  field: string,
): string {
  const value = record[field];
  if (value === undefined) {
    return new Date().toISOString();
  }
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/.test(
      value,
    )
  ) {
    throw new BadRequestException(
      `"${field}" debe ser una fecha ISO 8601 con zona horaria.`,
    );
  }

  const datePart = value.slice(0, 10);
  const parsedDatePart = new Date(`${datePart}T00:00:00.000Z`);
  const timestamp = Date.parse(value);
  if (
    Number.isNaN(timestamp) ||
    parsedDatePart.toISOString().slice(0, 10) !== datePart
  ) {
    throw new BadRequestException(`"${field}" no es una fecha válida.`);
  }
  return new Date(timestamp).toISOString();
}
