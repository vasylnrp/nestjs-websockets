import { Module } from "@nestjs/common";
import { Hero } from "./hero";

@Module({
    providers: [Hero],
    exports: [Hero],
})
export class HeroModule {}
