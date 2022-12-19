import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['steady-halibut-13510-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'c3RlYWR5LWhhbGlidXQtMTM1MTAkMy6E-roSsatt7S_ysaYaSHVsudx4f-idC1w',
          password:
            'Tz3b9-hxLrqtz0bj9o3K_M0XpfW4NprnhgU6pgzVc5tv5Y4U6UyWNoKZAYCgn-2Y6g1Svw==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
