import { Customer } from '../entities/Customer';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { DeliveryAddress } from '../entities/DeliveryAddress';
import { IFindCustomerByEmailOrCpf } from '../common/Interfaces/find-customer-by-email-or-cpf.interface';
import { IRequestCustomer } from '../common/Interfaces/Request-costumer.interface';

class CustomerRepository {
  private readonly customerRepository: Repository<Customer>;

  constructor() {
    this.customerRepository = AppDataSource.getRepository(Customer);
  }

  async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.customerRepository.findOne({
      relations: {
        orders: {
          orderItems: {
            item: true
          },
          customer: {
            deliveryAddress: true
          }
        }
      },
      where: { id }
    });

    return customer || undefined;
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.customerRepository.findOne({
      where: [{ email }]
    });

    return customer || undefined;
  }

  async findByEmailOrCpf({
    email,
    cpf
  }: IFindCustomerByEmailOrCpf): Promise<Customer | undefined> {
    const customer = await this.customerRepository.findOne({
      where: [{ email }, { cpf }]
    });

    return customer || undefined;
  }

  async createCustomer(
    { name, email, password, cpf }: IRequestCustomer,
    deliveryAddress: DeliveryAddress
  ): Promise<Customer> {
    const customer = this.customerRepository.create({
      name,
      email,
      cpf,
      password,
      deliveryAddress
    });

    await this.customerRepository.save(customer);

    return customer;
  }
}

export { CustomerRepository };
