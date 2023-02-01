import { User } from 'src/interfaces/User.interface';

declare global {
    namespace Express {
        interface Request {
            user: User | undefined;
        }
    }
}
