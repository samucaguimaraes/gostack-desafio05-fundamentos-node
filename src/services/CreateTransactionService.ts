import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
   /**
   * [x] Recebimento das informações
   * [x] Acesso ao repositório e add o novo objeto
   * [x] Validação: Não sacar valor maior que o total
   * [] Validação: Verificar type invalid
   */
    const {total} = this.transactionsRepository.getBalance();

    if(!['income','outcome'].includes(type)){
      throw new Error('Transations type is invalid');
    }

    if(type === 'outcome' && value > total){
      throw new Error('You do not have enough balance')
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
