// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Put,
} from '@nestjs/common';
// import { ReasonPhrases } from 'http-status-codes';
import { UsersService } from './users.service';
//import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';
//import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
//@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: UserDTO) {
    const user = await this.usersService.create(userDto);
    return UserEntity.toResponse(user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(UserEntity.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (user) return UserEntity.toResponse(user);
    // throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
    throw new NotFoundException();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (user) return UserEntity.toResponse(user);
    throw new NotFoundException();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
