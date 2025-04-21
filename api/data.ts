import brands from '../data/brands.json';
import models from '../data/models.json';
import cars from '../data/cars.json';
import { randomDelay } from './utils';

type RawBrand = {
  id: number;
  name: string;
  image: string;
};

type RawModel = {
  id: number;
  brand: number;
  name: string;
};

type RawCar = {
  id: number;
  model: number;
  image: string;
  releaseYear: number;
  price: number;
  engineSize: number;
  mileage: number;
  gearbox: string;
  city: string;
  datetime: string;
};

export type Brand = RawBrand;

export type Model = {
  id: number;
  brand: Brand;
  name: string;
};

export type Car = {
  id: number;
  model: Model;
  image: string;
  releaseYear: number;
  price: number;
  engineSize: number;
  mileage: number;
  gearbox: string;
  city: string;
  datetime: string;
};

const _brands: Brand[] = brands as Brand[];
const _models: RawModel[] = models as RawModel[];
const _cars: RawCar[] = cars as RawCar[];

export async function getBrands(): Promise<Brand[]> {
  await randomDelay();
  return _brands;
}

export async function getBrandById(id: number): Promise<Brand> {
  await randomDelay();
  return _brands.find((brand) => brand.id === id)!;
}

export async function getModels(): Promise<Model[]> {
  await randomDelay();
  const models = await Promise.all(
    _models.map(async (model) => ({
      ...model,
      brand: await getBrandById(model.brand),
    })),
  );
  return models;
}

export async function getModelsFromBrand(brandId: number): Promise<Model[]> {
  const brand = await getBrandById(brandId);
  return _models
    .filter((model) => model.brand === brandId)
    .map((model) => ({
      id: model.id,
      name: model.name,
      brand,
    }));
}

export async function getModelById(id: number): Promise<Model> {
  const model = _models.find((model) => model.id === id)!;
  const brand = await getBrandById(model.brand);
  return {
    id: model.id,
    name: model.name,
    brand,
  };
}

export async function getCars(): Promise<Car[]> {
  const cars = await Promise.all(
    _cars.map(async (car) => {
      const model = await getModelById(car.model);
      return {
        id: car.id,
        image: car.image,
        releaseYear: car.releaseYear,
        price: car.price,
        engineSize: car.engineSize,
        mileage: car.mileage,
        gearbox: car.gearbox,
        city: car.city,
        datetime: car.datetime,
        model,
      };
    }),
  );
  return cars;
}

export async function getCarsFromModel(modelId: number): Promise<Car[]> {
  const model = await getModelById(modelId);
  return _cars
    .filter((car) => car.model === modelId)
    .map((car) => ({
      id: car.id,
      image: car.image,
      releaseYear: car.releaseYear,
      price: car.price,
      engineSize: car.engineSize,
      mileage: car.mileage,
      gearbox: car.gearbox,
      city: car.city,
      datetime: car.datetime,
      model,
    }));
}

export async function getCarById(id: number): Promise<Car> {
  const car = _cars.find((car) => car.id === id)!;
  const model = await getModelById(car.model);
  return {
    id: car.id,
    model,
    image: car.image,
    releaseYear: car.releaseYear,
    price: car.price,
    engineSize: car.engineSize,
    mileage: car.mileage,
    gearbox: car.gearbox,
    city: car.city,
    datetime: car.datetime,
  };
}
