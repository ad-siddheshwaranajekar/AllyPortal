import { faker } from '@faker-js/faker';

export function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  // Ensure username is at least 7 chars and contains at least 1 letter
  let username = '';
  while (username.length < 7) {
    const twoDigits = faker.number.int({ min: 10, max: 99 });
    username = `${twoDigits}${firstName}${lastName}`.replace(/\s/g, '');
  }

  const email = `${firstName}.${faker.number.int({ min: 10, max: 99 })}@yopmail.com`.toLowerCase();

  return {
    firstName,
    lastName,
    username,
    email,
    phone1: faker.phone.number(),                  // random phone
    phone2: faker.string.numeric(10),             // 10-digit number
    phone3: faker.helpers.fromRegExp("\\d{10}")   // 10-digit number using regex
  };
}

export function generateWebhookUrl(
  baseUrl = 'https://ally.qat.anddone.com/#/ally/webhooks'
): string {
  const randomNumber = faker.number.int({ min: 1000, max: 9999 });
  return `${baseUrl}${randomNumber}`;
}
