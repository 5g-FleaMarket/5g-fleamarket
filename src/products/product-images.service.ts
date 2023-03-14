import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ProductImagesEntity } from 'src/global/entities/productimages.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImagesEntity)
    private productImagesRepository: Repository<ProductImagesEntity>,
  ) {}
  //   // 임시 폴더에서 최종 저장 경로로 파일 이동
  //   await fs.promises.rename(path.join(__dirname, './tmp', images.filename), finalImagePath);
  async saveProductImage(productId: number, imagePath: string, imageFilename: string): Promise<void> {
    const tmpImagePath = path.join('.', imagePath);
    const finalImagePath = path.join('.', 'src','public', imageFilename);//경로에서 폴더명 뺌
    // const finalImagePath = path.join('.', imageFilename);


    // 이미지 이동
    const fileStream = fs.createReadStream(tmpImagePath);
    const writeStream = fs.createWriteStream(finalImagePath);
    fileStream.pipe(writeStream);
    await fs.promises.unlink(imagePath);

    // ProductImagesEntity 인스턴스 생성
    const productImage = new ProductImagesEntity();
    productImage.productId = productId;
    productImage.imagePath = finalImagePath;

    // ProductImagesEntity 인스턴스 저장
    await this.productImagesRepository.save(productImage); 

  }
  
  
  async ShowMoreImage(productId: number) {

    const productImages = await this.productImagesRepository.find({
      where: { productId },
      select: ['imagePath'],
    });
    return productImages;
  }


  async getImagePath(productId: number) {
    const image = await this.productImagesRepository.findOne({ where: { productId } });
    return image ? image.imagePath : '이미지 없음';
  }
}