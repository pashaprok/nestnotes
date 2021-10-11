import { HttpException, HttpStatus } from '@nestjs/common';

export function isAuthor(
  realAuthorId: number,
  currentUserId: number,
  action: string,
  subject: string,
): void {
  if (realAuthorId !== currentUserId)
    throw new HttpException(
      `Only author can ${action} ${subject}!`,
      HttpStatus.FORBIDDEN,
    );
}
