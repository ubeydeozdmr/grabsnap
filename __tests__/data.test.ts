import { describe, it, expect } from 'vitest';
import {
  getBrands,
  getBrandById,
  getModels,
  getModelsFromBrand,
} from '../api/data';

describe('Data Functions', () => {
  describe('getBrands', () => {
    it('should return an array of brands', async () => {
      const brands = await getBrands();
      expect(Array.isArray(brands)).toBe(true);
      expect(brands.length).toBeGreaterThan(0);
    });
  });

  describe('getBrandById', () => {
    it('should return a brand with the given id', async () => {
      const brand = await getBrandById(1);
      expect(brand).toBeDefined();
      expect(brand.id).toBe(1);
    });

    it('should return undefined for non-existent id', async () => {
      const brand = await getBrandById(999);
      expect(brand).toBeUndefined();
    });
  });

  describe('getModels', () => {
    it('should return an array of models with brand information', async () => {
      const models = await getModels();
      expect(Array.isArray(models)).toBe(true);
      expect(models.length).toBeGreaterThan(0);
      expect(models[0].brand).toBeDefined();
    });
  });

  describe('getModelsFromBrand', () => {
    it('should return models for a specific brand', async () => {
      const models = await getModelsFromBrand(1);
      expect(Array.isArray(models)).toBe(true);
      expect(models.every((model) => model.brand.id === 1)).toBe(true);
    });
  });
});
