import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ValidationMethod } from '../enums/validation-method.enum.js';
import { VerificationType } from '../enums/verification-type.enum.js';
import {
  assertRecord,
  enumValue,
  optionalIsoDate,
  requiredText,
} from '../validation.js';
import { CreateVerificationEventDto } from './dto/create-verification-event.dto.js';
import { VerificationEvent } from './verification-event.model.js';

@Injectable()
export class VerificationEventsService {
  private readonly events: VerificationEvent[] = [];

  create(input: CreateVerificationEventDto): VerificationEvent {
    assertRecord(input);
    const verificationType = enumValue(
      input.verificationType,
      Object.values(VerificationType),
      'verificationType',
    );
    const validationMethod = enumValue(
      input.validationMethod,
      Object.values(ValidationMethod),
      'validationMethod',
    );
    if (typeof input.passed !== 'boolean') {
      throw new BadRequestException('"passed" debe ser booleano.');
    }

    let metadata: Record<string, unknown> | undefined;
    if (input.metadata !== undefined) {
      if (
        typeof input.metadata !== 'object' ||
        input.metadata === null ||
        Array.isArray(input.metadata)
      ) {
        throw new BadRequestException('"metadata" debe ser un objeto.');
      }
      metadata = input.metadata;
    }

    const event: VerificationEvent = {
      id: randomUUID(),
      resourceType: requiredText(input, 'resourceType'),
      resourceId: requiredText(input, 'resourceId'),
      verificationType,
      validationMethod,
      passed: input.passed,
      occurredAt: optionalIsoDate(input, 'occurredAt'),
      ...(metadata === undefined ? {} : { metadata }),
    };
    this.events.push(event);
    return event;
  }

  findAll(): VerificationEvent[] {
    return [...this.events];
  }

  findOne(id: string): VerificationEvent {
    const event = this.events.find((candidate) => candidate.id === id);
    if (!event) {
      throw new NotFoundException(`No existe el evento "${id}".`);
    }
    return event;
  }
}
