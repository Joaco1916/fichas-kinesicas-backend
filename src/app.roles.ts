import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    //PACIENTE = 'PACIENTE'
    AUTHOR = 'AUTHOR', //El kinesiolo
    ADMIN = 'ADMIN'
}

export enum AppResource {
    USER = 'USER',
    PACIENTE = 'PACIENTE',
    FICHA = 'FICHA'
}
export const roles: RolesBuilder = new RolesBuilder();

roles
    //Rol del AUTHOR
    .grant(AppRoles.AUTHOR)
    .readOwn([AppResource.USER, AppResource.PACIENTE, AppResource.FICHA])
    .updateOwn([AppResource.USER, AppResource.PACIENTE, AppResource.FICHA])
    .deleteOwn([AppResource.USER, AppResource.PACIENTE, AppResource.FICHA])
    .createOwn([AppResource.PACIENTE, AppResource.FICHA])
    //Rol del ADMIN
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.AUTHOR)
    .createAny([AppResource.USER])
    .readAny([AppResource.USER, AppResource.PACIENTE, AppResource.FICHA])
    .updateAny([AppResource.FICHA, AppResource.PACIENTE, AppResource.USER])
    .deleteAny([AppResource.FICHA, AppResource.PACIENTE, AppResource.USER])
