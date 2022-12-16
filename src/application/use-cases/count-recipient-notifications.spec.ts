import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { SendNotification } from './send-notification';

describe('Count recipients notifications', () => {
  let sendNotification: SendNotification;
  let countRecipientNotifications: CountRecipientNotifications;
  let notificationsRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sendNotification = new SendNotification(notificationsRepository);
    countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
  });

  it('it should be able to count recipient notifications', async () => {
    await sendNotification.execute({
      content: 'Nova solicitacao de amizade',
      category: 'social',
      recipientId: 'recipient-1',
    });

    await sendNotification.execute({
      content: 'Nova solicitacao de amizade',
      category: 'social',
      recipientId: 'recipient-1',
    });

    await sendNotification.execute({
      content: 'Nova solicitacao de amizade',
      category: 'social',
      recipientId: 'recipient-2',
    });

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toBe(2);
  });
});
