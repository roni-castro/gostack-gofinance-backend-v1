import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

export default class FindTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Transaction[] {
    return this.transactionsRepository.all();
  }
}
