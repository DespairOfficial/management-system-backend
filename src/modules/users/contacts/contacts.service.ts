import { AddToContactsDto } from './dto/add-to-contacts.dto';
import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private prismaService: PrismaService) {}

  private readonly contactsRepository = this.prismaService.contacts;
  async findMany(userId: User['id']) {
    const contacts = await this.contactsRepository.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
      include: {
        contact: true,
      },
    });
    return contacts.map((item) => item.contact);
  }

  async add(userId: User['id'], addToContactsDto: AddToContactsDto) {
    const contactObjects = addToContactsDto.ids.map((item) => {
      return {
        userId,
        contactId: item,
      };
    });
    const contactsCount = await this.contactsRepository.createMany({
      data: contactObjects,
    });
    return contactsCount;
  }
}
