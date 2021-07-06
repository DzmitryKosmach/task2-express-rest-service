import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    if (!board) throw new NotFoundException();
    return board;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    /** const boardRepository = getRepository(Board);  
  const board = await getBoardById(id);
  if(!board) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  const preUpdateBoard = boardRepository.create(dto);
  preUpdateBoard.id = id;
  const updatedBoard = await boardRepository.save(preUpdateBoard);  
  return updatedBoard;
  */
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const affected = await this.boardsService.remove(id);
    if (affected === undefined) throw new NotFoundException();
    return affected;

    //return this.boardsService.remove(id);
  }
}
