import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

interface CreateTransactionDTO {
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
    const income = this.transactions.reduce((accumulator, current) => {
      if (current.type === TransactionType.INCOME) {
        return accumulator + current.value;
      }
      return accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, current) => {
      if (current.type === TransactionType.OUTCOME) {
        return accumulator + current.value;
      }
      return accumulator;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
