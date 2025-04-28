import cars from '../data/cars.json';
import makes from '../data/makes.json';
import models from '../data/models.json';
import { randomDelay } from './utils';

type RawMake = {
  id: number;
  name: string;
  image: string;
};

type RawModel = {
  id: number;
  make: number;
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
  gearbox: 'auto' | 'manual';
  city: string;
  power: number;
  fuel: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  bodyType: 'SUV' | 'compact-SUV' | 'sedan';
  color: string;
  condition: 'perfect' | 'good' | 'bad';
  isNew: boolean;
  datetime: string;
};

export type Make = RawMake;
export type Model = Omit<RawModel, 'make'> & { make: Make };
export type Car = Omit<RawCar, 'model'> & { model: Model };

const _makes: Make[] = makes as Make[];
const _models: RawModel[] = models as RawModel[];
const _cars: RawCar[] = cars as RawCar[];

export async function getMakes(): Promise<Make[]> {
  await randomDelay();
  return _makes;
}

export async function getMakeById(id: number): Promise<Make> {
  await randomDelay();
  return _makes.find((make) => make.id === id)!;
}

export async function getModels(): Promise<Model[]> {
  await randomDelay();
  const models = await Promise.all(
    _models.map(async (model) => ({
      ...model,
      make: await getMakeById(model.make),
    })),
  );
  return models;
}

export async function getModelsFromMake(makeId: number): Promise<Model[]> {
  const make = await getMakeById(makeId);
  return _models
    .filter((model) => model.make === makeId)
    .map((model) => ({
      id: model.id,
      name: model.name,
      make,
    }));
}

export async function getModelById(id: number): Promise<Model> {
  const model = _models.find((model) => model.id === id)!;
  const make = await getMakeById(model.make);
  return {
    id: model.id,
    name: model.name,
    make,
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
        power: car.power,
        fuel: car.fuel,
        bodyType: car.bodyType,
        color: car.color,
        condition: car.condition,
        isNew: car.isNew,
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
      power: car.power,
      fuel: car.fuel,
      bodyType: car.bodyType,
      color: car.color,
      condition: car.condition,
      isNew: car.isNew,
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
    power: car.power,
    fuel: car.fuel,
    bodyType: car.bodyType,
    color: car.color,
    condition: car.condition,
    isNew: car.isNew,
    datetime: car.datetime,
  };
}
