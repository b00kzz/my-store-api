import { type DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

export const userProviders = [
    {
        provide: "USER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ["DATA_SOURCE"],
    },
    UserService,
];
