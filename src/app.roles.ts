import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    //PACIENTE = 'PACIENTE'
    AUTHOR = 'AUTHOR', //El kinesiolo
    ADMIN = 'ADMIN'
}

export enum AppResource {
    USER = 'USER',
    FICHA = 'FICHA'
}
export const roles: RolesBuilder = new RolesBuilder();

roles
    //Rol del AUTHOR
    .grant(AppRoles.AUTHOR)
    .updateOwn([AppResource.USER])
    .deleteOwn([AppResource.USER])
    .createOwn([AppResource.FICHA])
    .updateOwn([AppResource.FICHA])
    .deleteOwn([AppResource.FICHA])
    //Rol del ADMIN
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.AUTHOR)
    .createAny([AppResource.USER])
    .updateAny([AppResource.FICHA, AppResource.USER])
    .deleteAny([AppResource.FICHA, AppResource.USER])
