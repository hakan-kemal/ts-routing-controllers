// src/logins/controller.ts
import {
  JsonController,
  Body,
  Post,
  BadRequestError
} from "routing-controllers";
import User from "../users/entity";
import { IsString } from "class-validator";
import { sign } from "../jwt";

class AuthenticatePayload {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

@JsonController()
export default class LoginController {
  @Post("/logins")
  async authenticate(@Body() { email, password }: AuthenticatePayload) {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.id)
      throw new BadRequestError("A user with this email does not exist");
    if (!(await user.checkPassword(password)))
      throw new BadRequestError("The password is not correct");
    const jwt = sign({ id: user.id });
    return { jwt };
    // if user exists
    // if password is correct
    // send back a jwt token
    // else: send some HTTP 400 Bad request error
  }
}
