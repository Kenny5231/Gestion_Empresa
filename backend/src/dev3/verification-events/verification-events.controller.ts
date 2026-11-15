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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVerificationEventDto } from './dto/create-verification-event.dto.js';
import { VerificationEvent } from './verification-event.model.js';
import { VerificationEventsService } from './verification-events.service.js';

@ApiTags('Verification Events')
@Controller('verification-events')
export class VerificationEventsController {
  constructor(
    private readonly verificationEventsService: VerificationEventsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un evento de verificación' })
  @ApiBody({ type: CreateVerificationEventDto })
  @ApiCreatedResponse({ description: 'Evento registrado.', type: VerificationEvent })
  @ApiBadRequestResponse({ description: 'Los datos enviados no son válidos.' })
  create(
    @Body() input: CreateVerificationEventDto,
  ): VerificationEvent {
    return this.verificationEventsService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar los eventos de verificación' })
  @ApiOkResponse({
    description: 'Lista de eventos registrados.',
    type: VerificationEvent,
    isArray: true,
  })
  findAll(): VerificationEvent[] {
    return this.verificationEventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento de verificación por ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del evento.',
    example: 'b207e752-4468-4bea-9e6a-7206eab47273',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Evento encontrado.', type: VerificationEvent })
  @ApiBadRequestResponse({ description: 'El ID debe ser un UUID válido.' })
  @ApiNotFoundResponse({ description: 'No existe un evento con ese ID.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): VerificationEvent {
    return this.verificationEventsService.findOne(id);
  }
}
