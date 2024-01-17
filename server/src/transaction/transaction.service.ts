import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    console.log(':TR:Create:');
    const { title, amount, type, category } = createTransactionDto;
    const transaction = {
      title,
      amount,
      type,
      category: { id: category.id },
      user: { id },
    };

    if (!transaction) throw new BadGatewayException('Something went wrong...');

    console.log(':CREATE:', transaction);

    return this.transactionRepository.save(transaction);
  }

  async findAll(id: number) {
    console.log(':TRS:', id);
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return transactions;
  }

  // SUM
  async findAllByType(id: number, type: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
        type,
      },
    });

    return transactions.reduce((acc, obj) => acc + obj.amount, 0);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        category: true,
      },
    });

    if (!transaction) throw new NotFoundException('Transaction no found');
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return await this.transactionRepository.delete(id);
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    console.log(':PAGIN:', id, page, limit, 'skip:', page - 1);
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      // relations: {
      //   category: true,
      //   user: true,
      // },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return transactions;
  }
}
