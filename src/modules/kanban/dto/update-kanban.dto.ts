import { PartialType } from '@nestjs/swagger';
import { CreateKanbanDto } from './create-kanban.dto';

export class UpdateKanbanDto extends PartialType(CreateKanbanDto) {}
