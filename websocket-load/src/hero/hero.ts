import { Injectable, OnModuleInit, Scope } from "@nestjs/common";

// @Injectable({scope: Scope.DEFAULT})
export class Hero {
  private health: number;
  private id: string;

  constructor(id: string) {
    this.id = id;
    this.health = 100;
    console.log('hero init Connected');
  }

  getHealth() {
    return this.health;
  }

  healthImpact(value: number) {
    this.health += value;
  }
}
