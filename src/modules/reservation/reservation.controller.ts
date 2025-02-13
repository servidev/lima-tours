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
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { AssignIdInterceptor } from 'src/common/interceptors/assign-id.interceptor';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @Auth([Role.USER])
  async create(@Body() createReservationDto: CreateReservationDto) {
    const result = await this.reservationService.create(createReservationDto);
    return { success: true, result };
  }

  @Get()
  @Auth([Role.USER])
  async findAll(@Query('page') _page: string, @Query('limit') _limit: string) {
    const page = +_page;
    const limit = +_limit;
    const result = await this.reservationService.findAll(page, limit);
    return { success: true, result };
  }

  @Patch(':id')
  @Auth([Role.USER])
  @UseInterceptors(AssignIdInterceptor)
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    const result = await this.reservationService.update(
      +id,
      updateReservationDto,
    );
    return { success: true, result };
  }

  @Delete(':id')
  @Auth([Role.USER])
  async remove(@Param('id') id: string) {
    const result = await this.reservationService.remove(+id);
    return { success: true, dataRemove: result };
  }

  @Get('search/:term')
  async search(@Param('term') term: string) {
    const result = await this.reservationService.search(term);
    return { success: true, result };
  }
}
