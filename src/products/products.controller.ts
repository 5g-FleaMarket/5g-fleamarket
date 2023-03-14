import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Render,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductImagesService } from './product-images.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { Public } from 'src/global/common/decorator/skip-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Cookies } from 'src/global/common/decorator/find-cookie.decorator';
import { JwtDecodeDto } from '../user/dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { ProductImagesEntity } from 'src/global/entities/productimages.entity';

@Controller('productss')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ProductImagesService: ProductImagesService,
  ) {}
  //상품목록조회
  @Public()
  @Get('view')
  // @Render('product/products-view.ejs')
  getProducts() {
    return this.productsService.getAllProducts();
  }

  //상품 상세 보기
  @Public()
  @Get('view/:productId')
  findProduct(@Param('productId') productId: number) {
    return this.productsService.getProductById(productId);
  }
  //상품등록페이지 렌더용
  @UseGuards(JwtAuthGuard)
  @Get('up')
  @Render('product/products-upload.ejs')
  createProductForm() {
    return {};
  }

  // 상품등록/
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 3 }], {
      storage: diskStorage({
        destination: (req, file, callback) => {
          // console.log('File upload destination:', './tmp');
          callback(null, './tmp');
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4();
          const extension = extname(file.originalname);
          // console.log('File upload filename:', `${uniqueSuffix}${extension}`);
          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          // console.log('Invalid file type:', file.originalname);
          return callback(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 2, // 2MB
      },
    }),
  )

  @UseGuards(JwtAuthGuard)
  @Post('up')
  async createProduct(
    @Cookies('Authentication') jwt: JwtDecodeDto,
    @Body() payload: any, // payload 타입을 any로 설정합니다
    @UploadedFiles() rawImages: Record<string, Array<Express.Multer.File>>,
  ) {
    try {
      let images = rawImages.images;

      // console.log('Create product called with payload:', payload);
      if (!jwt || !jwt.id) {
        throw new BadRequestException('Invalid JWT');
      }

      const { title, description, price, categoryId } = payload;
      if (price < 0) {
        throw new BadRequestException('Price should be a positive value');
      }

      if (!Array.isArray(images)) {
        images = [images];
      }
      if (!images || images.length === 0) {
        throw new BadRequestException('No images provided');
      }

      const userId = jwt.id;
      // console.log('Creating product for user:', userId);
      // product 저장

      const product = await this.productsService.createProduct(
        title,
        description,
        price,
        categoryId,
        userId,
      ); 

      for (const image of images) {
        const { path, filename } = image;
        await this.ProductImagesService.saveProductImage(product.id, path, filename);
      }

      return product;
    } catch (error) {
      console.log('Error occurred in createProduct:', error);
      throw error;
    }
  }

  //상품수정
  @UseGuards(JwtAuthGuard)
  @Put('/:productId')
  updateProduct(
    @Cookies('Authentication') jwt: JwtDecodeDto,
    @Param('productId') productId: number,
    @Body() data: UpdateProductDto,
  ) {
    if (!jwt || !jwt.id) {
      throw new BadRequestException('Invalid JWT');
    }
    const userId = jwt.id;
    return this.productsService.updateProduct(
      productId,
      data.title,
      data.description,
      data.price,
      data.categoryId,
      userId,
    );
  }

  //상품삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  deleteProduct(
    @Cookies('Authentication') jwt: JwtDecodeDto,
    @Param('productId') productId: number,
    @Body() data: DeleteProductDto,
  ) {
    if (!jwt || !jwt.id) {
      throw new BadRequestException('Invalid JWT');
    }

    return this.productsService.deleteProduct(productId, jwt.id);
  }
  //상품 좋아요
  //@Post('products/:productId')
}
