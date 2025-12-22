import { faker } from '@faker-js/faker';

export function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const twoDigits = faker.number.int({ min: 10, max: 99 });

  return {
    firstName,
    lastName,
    username: `${lastName}${twoDigits}${firstName}`,
    email: `${firstName}.${twoDigits}@yopmail.com`,
    phone: faker.phone.number('##########')
  };
}

export function generateWebhookUrl(
  baseUrl = 'https://ally.qat.anddone.com/#/ally/webhooks'
): string {
  const randomNumber = faker.number.int({ min: 1000, max: 9999 });
  return `${baseUrl}${randomNumber}`;
}
