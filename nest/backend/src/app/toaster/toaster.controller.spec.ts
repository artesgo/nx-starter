import { Test, TestingModule } from '@nestjs/testing';
import { ToasterController } from './toaster.controller';

describe('ToasterController', () => {
  let controller: ToasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToasterController],
    }).compile();

    controller = module.get<ToasterController>(ToasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
