import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameController } from './game/game.controller';
import { GarrisonController } from './garrison/garrison.controller';
import { GarrisonService } from './garrison/garrison.service';
import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, GameController, GarrisonController],
  providers: [AppService, SupabaseService, GarrisonService],
})
export class AppModule {}
