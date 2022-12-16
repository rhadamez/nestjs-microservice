import { Notification } from '@application/entities/notifications';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.createdAt,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
