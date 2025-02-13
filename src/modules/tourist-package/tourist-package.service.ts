import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTouristPackageDto } from './dto/create-tourist-package.dto';
import { UpdateTouristPackageDto } from './dto/update-tourist-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TouristPackage } from './entities/tourist-package.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { pagination } from 'src/common/utils/pagination';

@Injectable()
export class TouristPackageService {
  private readonly logger = new Logger('TouristPackageService');

  constructor(
    @InjectRepository(TouristPackage)
    private readonly touristPackage: Repository<TouristPackage>,
  ) {}

  async create(
    createTouristPackageDto: CreateTouristPackageDto,
  ): Promise<TouristPackage> {
    const newTouristPackage = this.touristPackage.create(
      createTouristPackageDto,
    );
    try {
      return await this.touristPackage.save(newTouristPackage);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [touristPackages, count] = await this.touristPackage.findAndCount({
      skip,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    return pagination(page, limit, touristPackages, count);
  }

  async findOne(
    conditions: FindOptionsWhere<TouristPackage>,
  ): Promise<TouristPackage> {
    const touristPackages = await this.touristPackage.findOne({
      where: conditions,
    });

    if (!touristPackages) {
      throw new NotFoundException(
        `touristPackages with conditions ${JSON.stringify(conditions)} not found`,
      );
    }
    return touristPackages;
  }

  async update(
    id: number,
    updateTouristPackageDto: UpdateTouristPackageDto,
  ): Promise<TouristPackage> {
    const touristPackage = await this.findOne({ id: id });

    if (!touristPackage) {
      throw new NotFoundException(`touristPackages  not found`);
    }

    const loadTouristPackage = await this.touristPackage.preload({
      id,
      ...updateTouristPackageDto,
    });

    try {
      return await this.touristPackage.save(loadTouristPackage);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number): Promise<TouristPackage> {
    const existingTouristPackage = await this.findOne({ id });
    return await this.touristPackage.softRemove(existingTouristPackage);
  }

  async search(term: string): Promise<TouristPackage[] | null> {
    return await this.touristPackage.find({
      where: {
        name: Like(`%${term}%`),
      },
    });
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
