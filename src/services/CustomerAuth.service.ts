import { AppError } from '../common/errors/AppError';
import { IRequestAuth } from '../common/Interfaces/request-auth.interface';
import { ComparePassword } from '../common/utils/ComparePassword';
import { CustomerRepository } from '../repositories/Customer.repository';
import authConfig from '../config/Auth';
import { sign } from 'jsonwebtoken';

class CustomerAuthService {
  constructor(
    private readonly customerRepository: CustomerRepository = new CustomerRepository()
  ) {}

  async execute({ email, password }: IRequestAuth): Promise<IAuth> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Incorrect email or password', 404);
    }

    const passwordMatch = await ComparePassword(password, customer!.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email or password', 404);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign(
      {
        name: customer.name,
        email: customer.email
      },
      secret,
      {
        subject: customer.id,
        expiresIn
      }
    );
    return {
      customer: {
        name: customer.name,
        email: customer.email
      },
      token
    };
  }
}

export { CustomerAuthService };
