import { ForbiddenException } from '@nestjs/common';

export function isAuthor(
  realAuthorId: number,
  currentUserId: number,
  action: string,
  subject: string,
): void {
  if (realAuthorId !== currentUserId)
    throw new ForbiddenException(`Only author can ${action} ${subject}!`);
}
