import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notifications';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mapper/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
