import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload | UserPayload;
        }
    }
}

export interface UserPayload extends JwtPayload {
    _id: string;
    role: string;
}

export {};