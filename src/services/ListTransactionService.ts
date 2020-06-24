import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionResponse {
  transactions: Array<Transaction>;
  balance: Balance;
}

class ListTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionResponse {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    return { transactions, balance };
  }
}

export default ListTransactionService;
