import { Provider, service, ValueOrPromise } from "@loopback/core";
import { SignupTokenHandlerFn } from "@sourceloop/authentication-service";
import { UserService } from "../services/user.service";

export class LocalUserProvider implements Provider<SignupTokenHandlerFn>{

    constructor(
        @service(UserService)
        private readonly userService: UserService
    ){}

    value(): ValueOrPromise<SignupTokenHandlerFn> {
        return async (dataObject) => console.log(dataObject);
    }
    
}