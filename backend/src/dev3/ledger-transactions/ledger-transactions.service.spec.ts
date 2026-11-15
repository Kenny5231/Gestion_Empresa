import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { LedgerTxType } from '../enums/ledger-tx-type.enum.js';
import { LedgerTransactionsService } from './ledger-transactions.service.js';

describe('LedgerTransactionsService', () => {
  let service: LedgerTransactionsService;

  beforeEach(() => {
    service = new LedgerTransactionsService();
  });

  it('creates a transaction and makes it available by list and ID', () => {
    const transaction = service.create({
      reference: 'INV-2026-001',
      type: LedgerTxType.CREDIT,
      amountMinorUnits: 12550,
      currency: 'USD',
    });

    expect(transaction.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(service.findAll()).toEqual([transaction]);
    expect(service.findOne(transaction.id)).toBe(transaction);
    expect(Number.isNaN(Date.parse(transaction.occurredAt))).toBe(false);
  });

  it('rejects invalid amounts and duplicate references', () => {
    expect(() =>
      service.create({
        reference: 'INV-INVALID',
        type: LedgerTxType.DEBIT,
        amountMinorUnits: -1,
      }),
    ).toThrow(BadRequestException);

    service.create({
      reference: 'INV-2026-001',
      type: LedgerTxType.CREDIT,
      amountMinorUnits: 100,
    });
    expect(() =>
      service.create({
        reference: 'INV-2026-001',
        type: LedgerTxType.DEBIT,
        amountMinorUnits: 100,
      }),
    ).toThrow(ConflictException);
  });

  it('returns not found for an unknown transaction ID', () => {
    expect(() => service.findOne('missing')).toThrow(NotFoundException);
  });
});
