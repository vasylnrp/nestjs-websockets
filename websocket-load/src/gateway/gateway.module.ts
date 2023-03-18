import { Module } from "@nestjs/common";
import { HeroModule } from "src/hero/hero.module";
import { MyGateway } from "./gateway";
import { GatewayController } from "./gateway.controller";

@Module({
    providers: [MyGateway],
    controllers: [GatewayController],
    imports: [HeroModule],
})
export class GatewayModule {}
