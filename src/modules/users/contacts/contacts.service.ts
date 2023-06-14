import { ConversationService } from './../../chat/conversation/conversation.service';
import { AddToContactsDto } from './dto/add-to-contacts.dto';
import { PrismaService } from 'src/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private prismaService: PrismaService, private conversationService: ConversationService) {}

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
    const reverseContacts = [];

    const contactObjects = addToContactsDto.ids.map((item) => {
      reverseContacts.push({
        userId: item,
        contactId: userId,
      });
      return {
        userId,
        contactId: item,
      };
    });
    contactObjects.push(...reverseContacts);

    const contactsCount = await this.contactsRepository.createMany({
      data: contactObjects,
    });

    addToContactsDto.ids.forEach((item) => {
      this.conversationService.createWithUserId(userId, item);
    });

    return contactsCount;
  }
}
