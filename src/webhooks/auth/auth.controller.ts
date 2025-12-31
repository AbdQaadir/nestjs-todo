import { Controller, Post, Req } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { verifyWebhook } from '@clerk/express/webhooks';

@Controller('webhooks/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async handleWebhook(@Req() req: any) {
    const evt = await verifyWebhook(req);
    const { type, data } = evt;

    switch (type) {
      case 'user.created':
        return await this.usersService.create({
          name: data?.first_name + ' ' + data?.last_name,
          email: data?.email_addresses[0]?.email_address,
          userId: data?.id,
        });

      case 'user.updated':
        return await this.usersService.update(data?.id, {
          name: data?.first_name + ' ' + data?.last_name,
          email: data?.email_addresses[0]?.email_address,
          userId: data?.id,
        });

        break;

      case 'user.deleted':
        return await this.usersService.remove(data?.id || '');
    }

    return { received: true };
  }
}
