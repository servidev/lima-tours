import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IsUniqueConstraintInput } from '../decorators/is-unique.decorator';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { tableName, column }: IsUniqueConstraintInput = args.constraints[0];

    //! Obtén el currentId del objeto args
    const currentId = args.object['id'];

    const queryBuilder = this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value });

    if (currentId) {
      queryBuilder.andWhere(`${tableName}.id != :currentId`, { currentId });
    }

    const exists = await queryBuilder.getExists();

    return !exists;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return (
      validationArguments?.constraints?.[1]?.message ||
      `${validationArguments.property} is already exist`
    );
  }
}
