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
import { TouristPackageService } from './tourist-package.service';
import { CreateTouristPackageDto } from './dto/create-tourist-package.dto';
import { UpdateTouristPackageDto } from './dto/update-tourist-package.dto';
import { AssignIdInterceptor } from '@/common/interceptors/assign-id.interceptor';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '@/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Paquetes turísticos')
@Controller('tourist-packages')
export class TouristPackageController {
  constructor(private readonly touristPackageService: TouristPackageService) {}

  @Post()
  @ApiBearerAuth()
  @Auth([Role.USER])
  async create(@Body() createTouristPackageDto: CreateTouristPackageDto) {
    const result = await this.touristPackageService.create(
      createTouristPackageDto,
    );
    return { success: true, result };
  }

  @Get()
  async findAll(@Query('page') _page: string, @Query('limit') _limit: string) {
    const page = +_page;
    const limit = +_limit;
    const result = await this.touristPackageService.findAll(page, limit);
    return { success: true, result };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Auth([Role.USER])
  @UseInterceptors(AssignIdInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTouristPackageDto: UpdateTouristPackageDto,
  ) {
    const result = await this.touristPackageService.update(
      id,
      updateTouristPackageDto,
    );
    return { success: true, result };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Auth([Role.USER])
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.touristPackageService.remove(id);
    return { success: true, dataRemove: result };
  }

  @Get('search/:term')
  async search(@Param('term') term: string) {
    const result = await this.touristPackageService.search(term);
    return { success: true, result };
  }
}
