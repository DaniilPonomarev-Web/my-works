import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: process.env['KAFKA_CLIENT_ID'],
      brokers: [process.env['KAFKA_BROKER'] || 'localhost:9092'],
    });
    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
    });
    this.consumer = this.kafka.consumer({
      groupId: process.env['KAFKA_GROUP_ID'] || 'notifications-group',
    });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }

  async sendMessageWithReturn(topic: string, message: string): Promise<any> {
    try {
      const result = await this.producer.send({
        topic,
        messages: [{ value: message }],
      });

      // Kafka возвращает errorCode = 0 при успешной отправке
      if (result[0]?.errorCode === 0) {
        return result;
      } else {
        console.error('Ошибка в ответе кафка:', result[0]?.errorCode);
        return null;
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения в кафку:', error);
      return null;
    }
  }

  async consume(topic: string, callback: (message: any) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        callback(message.toString());
      },
    });
  }
}
