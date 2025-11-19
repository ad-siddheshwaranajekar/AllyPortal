import { faker } from '@faker-js/faker';

export function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const twoDigits = faker.number.int({ min: 10, max: 99 });

  return {
    firstName,
    lastName,
    username: `${firstName}${twoDigits}`,                    // Dhanush01
    email: `${firstName}.${twoDigits}@yopmail.com`, // Dhanush.Kumar23@yopmail.com
    phone: faker.phone.number("##########")                  // Random 10-digit phone
  };
}
