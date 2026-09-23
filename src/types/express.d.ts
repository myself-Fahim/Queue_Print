import { Role } from "../../generated/prisma/enums";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id:string
                name: string;
                email: string;
                phone_no: string;
                role: Role;
            };
        }
    }
}

export {};