import { Content } from './content';
import { Notification } from './notifications';

describe('Notification', () => {
  test('it should be able to create a notification', () => {
    const content = new Notification({
      content: new Content('Nova solicitacao de amizade'),
      category: 'social',
      recipientId: '1',
    });

    expect(content).toBeTruthy();
  });
});
