import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { SetMetadata } from "@nestjs/common";

export const Public = () => SetMetadata("isPublic", true);

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") implements CanActivate {
  public constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    // Make sure to check the authorization, for now, just return false to have a difference between public routes.
    return false;
  }
}
