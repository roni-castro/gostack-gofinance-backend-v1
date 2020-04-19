import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { mapToTransactionType } from '../repositories/transactionTypeMapper';
import TransactionType from '../models/TransactionType';

interface CreateTransactionRequestDTO {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    value,
    type,
    title,
  }: CreateTransactionRequestDTO): Transaction {
    const transactionType = mapToTransactionType(type);
    if (transactionType === TransactionType.Outcome) {
      const balance = this.transactionsRepository.getBalance();
      if (value > balance.total) {
        throw new Error('The outcome is bigger than the total value in cash');
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type: transactionType,
    });
    return transaction;
  }
}

export default CreateTransactionService;
