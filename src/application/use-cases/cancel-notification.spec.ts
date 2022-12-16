import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

describe('Cancel notification', () => {
  let sendNotification: SendNotification;
  let cancelNotification: CancelNotification;
  let notificationsRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sendNotification = new SendNotification(notificationsRepository);
    cancelNotification = new CancelNotification(notificationsRepository);
  });

  it('should be able to cancel an existing notification', async () => {
    const { notification } = await sendNotification.execute({
      content: 'Nova solicitacao de amizade',
      category: 'social',
      recipientId: 'exemple-recipient-id',
    });

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not me able to cancel an non existing notification', async () => {
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
