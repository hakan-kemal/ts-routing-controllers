// src/pages/controller.ts
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
import Page from "./entity";

// type PageList = { pages: Page[] };

@JsonController()
export default class PageController {
  @Get("/pages/:id")
  getPage(@Param("id") id: number) {
    return Page.findOne[id];
  }

  //   @Get("/pages")
  //   allPages(): PageList {
  //     const values: Page[] = Object.values(pagesById);
  //     const pages = { pages: values };
  //     return pages;
  //   }

  @Get("/pages")
  async allPages() {
    const pages = await Page.find();
    return { pages };
  }

  @Put("/pages/:id")
  async updatePage(@Param("id") id: number, @Body() update: Partial<Page>) {
    const page = await Page.findOne(id);
    // console.log(`Incoming PUT body param:`, body);
    if (!page) throw new NotFoundError("Cannot find page");
    return Page.merge(page, update).save();
  }

  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() page: Page) {
    // console.log(`Incoming POST body param:`, body);
    return page.save();
  }
}
