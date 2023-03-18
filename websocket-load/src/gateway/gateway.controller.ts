import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { Hero } from 'src/hero/hero';
import { MyGateway } from './gateway';

@Controller('gateway')
export class GatewayController {

  @Inject()
  private readonly myGateway: MyGateway;

  @Get('heroes')
  findAllHeroes(): Hero[] {
    return this.myGateway.getHeroes();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} gateway`;
  }
}
