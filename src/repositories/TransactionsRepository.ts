import Transaction from '../models/Transaction';
import TransactionType from '../models/TransactionType';
import { Balance } from '../models/Balance';

interface CreateTransactiontDTO {
  title: string;
  value: number;
  type: TransactionType;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome: number = this.sumTransactionsValueByType(
      TransactionType.Income,
    );
    const totalOutcome: number = this.sumTransactionsValueByType(
      TransactionType.Outcome,
    );
    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
    return balance;
  }

  public sumTransactionsValueByType(type: TransactionType): number {
    return this.transactions
      .filter(tran => tran.type === type)
      .map(tran => tran.value)
      .reduce((acc, curr) => acc + curr, 0);
  }

  public create({ title, value, type }: CreateTransactiontDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
