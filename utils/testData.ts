export const generateRandomUser = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return {
    firstName: `Test${random}`,
    lastName: `User${random}`,
    address: `${random} Test Street`,
    city: 'TestCity',
    state: 'CA',
    zipCode: '90210',
    phone: '555-123-4567',
    ssn: '123-45-6789',
    username: `testuser${timestamp}${random}`,
    password: 'TestPassword123!',
  };
};

export const generateRandomAmount = (min: number = 10, max: number = 100): string => {
  const amount = (Math.random() * (max - min) + min).toFixed(2);
  return amount;
};
