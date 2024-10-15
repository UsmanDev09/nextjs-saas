const successMessages = {
  userFieldChanged: (fieldName: string) => `${fieldName} was changed`,
  emailSent: (email: string) => `We have sent email to ${email}`,
  removeFriend: () => 'Friend has been removed',
};

export default successMessages;
