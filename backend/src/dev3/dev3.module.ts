import { Module } from '@nestjs/common';
import { LedgerTransactionsController } from './ledger-transactions/ledger-transactions.controller.js';
import { LedgerTransactionsService } from './ledger-transactions/ledger-transactions.service.js';
import { VerificationEventsController } from './verification-events/verification-events.controller.js';
import { VerificationEventsService } from './verification-events/verification-events.service.js';

@Module({
  controllers: [VerificationEventsController, LedgerTransactionsController],
  providers: [VerificationEventsService, LedgerTransactionsService],
})
export class Dev3Module {}
