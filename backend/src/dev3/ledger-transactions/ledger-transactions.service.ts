import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { LedgerTxType } from '../enums/ledger-tx-type.enum.js';
import {
  assertRecord,
  enumValue,
  optionalIsoDate,
  optionalText,
  requiredText,
} from '../validation.js';
import { CreateLedgerTransactionDto } from './dto/create-ledger-transaction.dto.js';
import { LedgerTransaction } from './ledger-transaction.model.js';

@Injectable()
export class LedgerTransactionsService {
  private readonly transactions: LedgerTransaction[] = [];

  create(input: CreateLedgerTransactionDto): LedgerTransaction {
    assertRecord(input);
    const reference = requiredText(input, 'reference');
    if (
      this.transactions.some(
        (transaction) => transaction.reference === reference,
      )
    ) {
      throw new ConflictException(
        `Ya existe una transacción con la referencia "${reference}".`,
      );
    }

    const type = enumValue(
      input.type,
      Object.values(LedgerTxType),
      'type',
    );
    if (
      typeof input.amountMinorUnits !== 'number' ||
      !Number.isSafeInteger(input.amountMinorUnits) ||
      input.amountMinorUnits <= 0
    ) {
      throw new BadRequestException(
        '"amountMinorUnits" debe ser un entero positivo y seguro.',
      );
    }

    let currency: string | undefined;
    if (input.currency !== undefined) {
      currency = requiredText(input, 'currency');
      if (!/^[A-Z]{3}$/.test(currency)) {
        throw new BadRequestException(
          '"currency" debe ser un código de moneda de tres letras mayúsculas.',
        );
      }
    }

    const description = optionalText(input, 'description');
    const transaction: LedgerTransaction = {
      id: randomUUID(),
      reference,
      type,
      amountMinorUnits: input.amountMinorUnits,
      occurredAt: optionalIsoDate(input, 'occurredAt'),
      ...(currency === undefined ? {} : { currency }),
      ...(description === undefined ? {} : { description }),
    };
    this.transactions.push(transaction);
    return transaction;
  }

  findAll(): LedgerTransaction[] {
    return [...this.transactions];
  }

  findOne(id: string): LedgerTransaction {
    const transaction = this.transactions.find(
      (candidate) => candidate.id === id,
    );
    if (!transaction) {
      throw new NotFoundException(`No existe la transacción "${id}".`);
    }
    return transaction;
  }
}
