import { Balance } from '../models/Balance';
import TransactionsRepository from '../repositories/TransactionsRepository';

export default class GetTransactionBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Balance {
    return this.transactionsRepository.getBalance();
  }
}
