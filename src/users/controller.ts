// src/users/controller.ts
import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  Post,
  HttpCode,
  NotFoundError
} from "routing-controllers";
// import pagesById from "./entity";
import User from "./entity";

// type PageList = { pages: Page[] };

@JsonController()
export default class UserController {
  @Get("/users/:id")
  getUser(@Param("id") id: number) {
    return User.findOne[id];
  }

  //   @Get("/pages")
  //   allPages(): PageList {
  //     const values: Page[] = Object.values(pagesById);
  //     const pages = { pages: values };
  //     return pages;
  //   }

  @Get("/users")
  async allUsers() {
    const users = await User.find();
    return { users };
  }

  @Put("/users/:id")
  async updateUser(@Param("id") id: number, @Body() update: Partial<User>) {
    const user = await User.findOne(id);
    // console.log(`Incoming PUT body param:`, body);
    if (!user) throw new NotFoundError("Cannot find user");
    return User.merge(user, update).save();
  }

  @Post("/users")
  @HttpCode(201)
  createUser(@Body() user: User) {
    // console.log(`Incoming POST body param:`, body);
    return user.save();
  }
}
