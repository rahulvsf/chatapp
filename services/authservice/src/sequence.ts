import { inject } from "@loopback/core";
import { SequenceHandler, SequenceActions, FindRoute, ParseParams, InvokeMethod, Send, Reject, RequestContext } from "@loopback/rest";
import { AuthenticationBindings, AuthClient } from "@sourceloop/authentication-service";
import {AuthenticateFn} from 'loopback4-authentication';

export class MySequence implements SequenceHandler {
    constructor(
      @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
      @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
      @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
      @inject(SequenceActions.SEND) public send: Send,
      @inject(SequenceActions.REJECT) public reject: Reject,
      // Inject CLIENT_AUTH_ACTION sequence action provider
      @inject(AuthenticationBindings.CLIENT_AUTH_ACTION)
      protected authenticateRequestClient: AuthenticateFn<AuthClient>,
    ) {}
  
    async handle(context: RequestContext) {
      try {
        const {request, response} = context;
        const route = this.findRoute(request);
        const args = await this.parseParams(request, route);
        request.body = args[args.length - 1];
  
        // Perform client authentication here
        await this.authenticateRequestClient(request);

        console.log("SEQUENCE******");
        const result = await this.invoke(route, args);
        this.send(response, result);
      
      } catch (err) {
        console.error(err);
        this.reject(context, err);
      }
    }
  }