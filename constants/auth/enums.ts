export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export enum AuthAccessLevel {
  Public,
  Authorized,
  Unauthorized,
}

export enum UserStatus {
  Pending = 'pending',
  Verified = 'verified',
  Active = 'active',
  Blocked = 'blocked',
}
