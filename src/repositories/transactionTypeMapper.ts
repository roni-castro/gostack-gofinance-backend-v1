import TransactionType from '../models/TransactionType';

export const mapToTransactionType = (type: string): TransactionType =>
  type as TransactionType;
