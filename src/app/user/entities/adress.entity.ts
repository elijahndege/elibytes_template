import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'addresses' })
export class Address {
  constructor(intialData: Partial<Address> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'text', name: 'street' })
  street: string;

  @Column({ type: 'varchar', name: 'city' })
  city: string;

  @Column({ type: 'varchar', name: 'county' })
  county: string;

  @Column({ type: 'varchar', name: 'country' })
  country: string;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
