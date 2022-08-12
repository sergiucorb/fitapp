import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fitappdb:fitappdb@fitcluster.ovalrl9.mongodb.net/test?retryWrites=true&w=majority',
    ),
  ],
})
export class DbModule {}
