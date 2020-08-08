import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // Check the type of the transaction and if it is less than the total balance
    if (type === 'outcome') {
      if (this.transactionsRepository.getBalance().total - value < 0) {
        throw new Error(
          'Outcome transactions must be less than the total balance',
        );
      }
    }
    // Create the transaction in the TransactionsRepository
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
