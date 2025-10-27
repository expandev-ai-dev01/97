/**
 * @module utils/zodValidation
 * @description Reusable Zod validation schemas and utilities
 */

import { z } from 'zod';

/**
 * @summary String validation with max length
 */
export const zString = z.string().min(1);

/**
 * @summary Nullable string validation with max length
 */
export const zNullableString = (maxLength?: number): z.ZodNullable<z.ZodString> => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary Name validation (1-200 characters)
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary Description validation (max 500 characters, nullable)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Foreign key validation (positive integer, nullable)
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary Foreign key validation (positive integer, required)
 */
export const zFK = z.number().int().positive();

/**
 * @summary Bit/Boolean validation (0 or 1)
 */
export const zBit = z.union([z.literal(0), z.literal(1)]);

/**
 * @summary Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * @summary Email validation
 */
export const zEmail = z.string().email();

/**
 * @summary URL validation
 */
export const zUrl = z.string().url();

/**
 * @summary UUID validation
 */
export const zUuid = z.string().uuid();

/**
 * @summary Positive number validation
 */
export const zPositiveNumber = z.number().positive();

/**
 * @summary Non-negative number validation
 */
export const zNonNegativeNumber = z.number().nonnegative();
