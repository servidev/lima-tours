import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '@/common/enums/rol.enum';
import { AssignIdInterceptor } from '@/common/interceptors/assign-id.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Reservaciones')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiBearerAuth()
  @Auth([Role.USER])
  async create(@Body() createReservationDto: CreateReservationDto) {
    const result = await this.reservationService.create(createReservationDto);
    return { success: true, result };
  }

  @Get()
  async findAll(@Query('page') _page: string, @Query('limit') _limit: string) {
    const page = +_page;
    const limit = +_limit;
    const result = await this.reservationService.findAll(page, limit);
    return { success: true, result };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Auth([Role.USER])
  @UseInterceptors(AssignIdInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    const result = await this.reservationService.update(
      id,
      updateReservationDto,
    );
    return { success: true, result };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Auth([Role.USER])
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.reservationService.remove(id);
    return { success: true, dataRemove: result };
  }

  @Get('search/:term')
  async search(@Param('term') term: string) {
    const result = await this.reservationService.search(term);
    return { success: true, result };
  }
}
