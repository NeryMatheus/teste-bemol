import { Customer } from '../entities/Customer';
import { CustomerRepository } from '../repositories/Customer.repository';
import { AppError } from '../common/errors/AppError';
import { HashPassword } from '../common/utils/HashPassword';
import { DeliveryAddress } from '../entities/DeliveryAddress';
import { IRequestCustomer } from '../common/Interfaces/Request-costumer.interface';
import { ListCustomerOrdersDTO } from '../common/dtos/list-customer-order.dto';

class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository = new CustomerRepository()
  ) {}

  async createCustomer({
    name,
    email,
    password,
    cpf,
    street,
    number,
    complement,
    city,
    state,
    zipcode
  }: IRequestCustomer): Promise<IListCustomer> {
    const customerAlreadyExists =
      await this.customerRepository.findByEmailOrCpf({
        email,
        cpf
      });
    if (customerAlreadyExists) {
      throw new AppError('Customer already exists');
    }

    const passwordHash = await HashPassword(password);
    const deliveryAddress = new DeliveryAddress();
    if (!street || !number || !city || !state || !zipcode) {
      throw new AppError('Address fields cannot be empty');
    }
    deliveryAddress.street = street;
    deliveryAddress.number = number;
    deliveryAddress.complement = complement || '';
    deliveryAddress.city = city;
    deliveryAddress.state = state;
    deliveryAddress.zipCode = zipcode;

    const customer = await this.customerRepository.createCustomer(
      {
        name,
        email,
        password: passwordHash,
        cpf
      },
      deliveryAddress
    );

    const customerDTO: IListCustomer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      city: customer.deliveryAddress.city,
      state: customer.deliveryAddress.state,
      zipCode: customer.deliveryAddress.zipCode
    };

    return customerDTO;
  }

  async getOrders(id: string): Promise<ListCustomerOrdersDTO[]> {
    const customer = await this.customerRepository.findById(id);

    await this.validateCustomer(id);
    await this.validateCustomerOrder(id);

    const CustomerOrders = customer!.orders.map(
      (order) => new ListCustomerOrdersDTO(order)
    );

    return CustomerOrders;
  }

  private async validateCustomer(CustomerId: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(CustomerId);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }

  private async validateCustomerOrder(
    CustomerId: string
  ): Promise<Customer | undefined> {
    const customer = await this.customerRepository.findById(CustomerId);

    if (customer && customer.orders.length === 0) {
      throw new AppError('Customer has no orders', 404);
    }

    return customer;
  }
}

export { CustomerService };
