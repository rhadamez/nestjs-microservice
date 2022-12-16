import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  let sendNotification: SendNotification;
  let notificationsRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sendNotification = new SendNotification(notificationsRepository);
  });

  it('it should be able to send a notification', async () => {
    const { notification } = await sendNotification.execute({
      content: 'Nova solicitacao de amizade',
      category: 'social',
      recipientId: 'exemple-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
