import { getRepository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "src/users/entities";
import * as constants from "./constants";

export const setDefaultUser = async (config: ConfigService) => {
    const userRepository = getRepository<User>(User)

    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('email = :email', { email: config.get<string>(constants.DEFAULT_USER_EMAIL)})
        .getOne()

    if(!defaultUser){
        const adminUser = userRepository.create({
            email: config.get<string>(constants.DEFAULT_USER_EMAIL),
            password: config.get<string>(constants.DEFAULT_USER_PASSWORD),
            roles: ['ADMIN']
        })

        return await userRepository.save(adminUser)
    }
    else{
        return defaultUser;
    }
}