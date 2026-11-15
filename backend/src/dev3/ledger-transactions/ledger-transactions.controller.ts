import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLedgerTransactionDto } from './dto/create-ledger-transaction.dto.js';
import { LedgerTransaction } from './ledger-transaction.model.js';
import { LedgerTransactionsService } from './ledger-transactions.service.js';

@ApiTags('Ledger Transactions')
@Controller('ledger-transactions')
export class LedgerTransactionsController {
  constructor(
    private readonly ledgerTransactionsService: LedgerTransactionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una transacción financiera' })
  @ApiBody({ type: CreateLedgerTransactionDto })
  @ApiCreatedResponse({
    description: 'Transacción registrada.',
    type: LedgerTransaction,
  })
  @ApiBadRequestResponse({ description: 'Los datos enviados no son válidos.' })
  @ApiConflictResponse({
    description: 'Ya existe una transacción con esa referencia.',
  })
  create(@Body() input: CreateLedgerTransactionDto): LedgerTransaction {
    return this.ledgerTransactionsService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar las transacciones financieras' })
  @ApiOkResponse({
    description: 'Lista de transacciones registradas.',
    type: LedgerTransaction,
    isArray: true,
  })
  findAll(): LedgerTransaction[] {
    return this.ledgerTransactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una transacción por ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la transacción.',
    example: 'b207e752-4468-4bea-9e6a-7206eab47273',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Transacción encontrada.',
    type: LedgerTransaction,
  })
  @ApiBadRequestResponse({ description: 'El ID debe ser un UUID válido.' })
  @ApiNotFoundResponse({ description: 'No existe una transacción con ese ID.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): LedgerTransaction {
    return this.ledgerTransactionsService.findOne(id);
  }
}
