import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  let countRecipientNotifications: CountRecipientNotifications;
  let notificationsRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
  });

  it('it should be able to count recipient notifications', async () => {
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toBe(2);
  });
});
