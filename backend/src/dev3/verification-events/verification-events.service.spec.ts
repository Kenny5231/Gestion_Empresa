import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ValidationMethod } from '../enums/validation-method.enum.js';
import { VerificationType } from '../enums/verification-type.enum.js';
import { VerificationEventsService } from './verification-events.service.js';

describe('VerificationEventsService', () => {
  let service: VerificationEventsService;

  beforeEach(() => {
    service = new VerificationEventsService();
  });

  it('creates an event and makes it available by list and ID', () => {
    const event = service.create({
      resourceType: 'employee',
      resourceId: 'employee-104',
      verificationType: VerificationType.IDENTITY,
      validationMethod: ValidationMethod.MANUAL,
      passed: true,
    });

    expect(event.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(service.findAll()).toEqual([event]);
    expect(service.findOne(event.id)).toBe(event);
    expect(Number.isNaN(Date.parse(event.occurredAt))).toBe(false);
  });

  it('rejects invalid enum values and non-boolean results', () => {
    expect(() =>
      service.create({
        resourceType: 'employee',
        resourceId: 'employee-104',
        verificationType: 'UNKNOWN' as VerificationType,
        validationMethod: ValidationMethod.MANUAL,
        passed: true,
      }),
    ).toThrow(BadRequestException);

    expect(() =>
      service.create({
        resourceType: 'employee',
        resourceId: 'employee-104',
        verificationType: VerificationType.IDENTITY,
        validationMethod: ValidationMethod.MANUAL,
        passed: 'true' as unknown as boolean,
      }),
    ).toThrow(BadRequestException);
  });

  it('returns not found for an unknown event ID', () => {
    expect(() => service.findOne('missing')).toThrow(NotFoundException);
  });
});
