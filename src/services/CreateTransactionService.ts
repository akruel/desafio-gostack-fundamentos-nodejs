import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

interface TransactionRequest {
  title: string;
  value: number;
  type: TransactionType;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionRequest): Transaction {
    const transaction: TransactionRequest = { title, type, value };
    if (
      transaction.type === TransactionType.OUTCOME &&
      this.transactionsRepository.getBalance().total < transaction.value
    ) {
      throw Error('Insufficient funds.');
    }

    if (
      transaction.type === TransactionType.INCOME ||
      transaction.type === TransactionType.OUTCOME
    ) {
      return this.transactionsRepository.create(transaction);
    }
    throw Error(
      'Invalid Transacation Type. Only income or outcome is available.',
    );
  }
}

export default CreateTransactionService;
