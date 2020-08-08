import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    // Get the transactions balance
    const balance = this.transactions.reduce(
      (accumulatedBalance, transaction) => {
        const currentBalance = accumulatedBalance;
        currentBalance[transaction.type] += transaction.value;
        currentBalance.total = currentBalance.income - currentBalance.outcome;
        return currentBalance;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // Create a Transaction and save it
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
