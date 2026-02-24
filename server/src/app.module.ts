import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameController } from './game/game.controller';
import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, GameController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
