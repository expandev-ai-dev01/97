/**
 * @module api/v1/internal/checklist-item/controller
 * @description Checklist item CRUD operations controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import {
  checklistItemCreate,
  checklistItemUpdate,
  checklistItemDelete,
} from '@/services/checklist';

/**
 * @api {post} /internal/checklist-item Create Checklist Item
 * @apiName CreateChecklistItem
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Adds an item to a checklist
 *
 * @apiParam {String} checklist_id Checklist identifier
 * @apiParam {String} nome_item Item name (2-100 characters)
 * @apiParam {String} [observacao] Optional notes (max 200 characters)
 *
 * @apiSuccess {Object} data Created item
 * @apiSuccess {String} data.id Item identifier
 * @apiSuccess {String} data.checklist_id Checklist identifier
 * @apiSuccess {String} data.nome_item Item name
 * @apiSuccess {String} data.observacao Notes
 * @apiSuccess {Number} data.ordem Display order
 * @apiSuccess {String} data.status Item status
 * @apiSuccess {Date} data.data_atualizacao Update timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} NotFoundError Checklist not found
 * @apiError {String} LimitError Item limit exceeded
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const bodySchema = z.object({
    checklist_id: z.string().uuid('ID do checklist inválido'),
    nome_item: z
      .string()
      .min(2, 'O nome deve ter pelo menos 2 caracteres')
      .max(100, 'O nome deve ter no máximo 100 caracteres'),
    observacao: z.string().max(200, 'A observação deve ter no máximo 200 caracteres').optional(),
  });

  try {
    const validated = bodySchema.parse(req.body);
    const data = await checklistItemCreate(validated);
    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Erro de validação', 'VALIDATION_ERROR', error.errors));
    } else if (error.message.includes('não encontrado')) {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    } else if (error.message.includes('limite')) {
      res.status(400).json(errorResponse(error.message, 'LIMIT_ERROR'));
    } else {
      res.status(500).json(errorResponse(error.message, 'SERVER_ERROR'));
    }
  }
}

/**
 * @api {put} /internal/checklist-item/:id Update Checklist Item
 * @apiName UpdateChecklistItem
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates a checklist item
 *
 * @apiParam {String} id Item identifier
 * @apiParam {String} nome_item Item name (2-100 characters)
 * @apiParam {String} [observacao] Optional notes (max 200 characters)
 *
 * @apiSuccess {Object} data Updated item
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} NotFoundError Item not found
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid('ID inválido'),
  });

  const bodySchema = z.object({
    nome_item: z
      .string()
      .min(2, 'O nome deve ter pelo menos 2 caracteres')
      .max(100, 'O nome deve ter no máximo 100 caracteres'),
    observacao: z.string().max(200, 'A observação deve ter no máximo 200 caracteres').optional(),
  });

  try {
    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const data = await checklistItemUpdate({
      id: validatedParams.id,
      ...validatedBody,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Erro de validação', 'VALIDATION_ERROR', error.errors));
    } else if (error.message.includes('não encontrado')) {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    } else {
      res.status(500).json(errorResponse(error.message, 'SERVER_ERROR'));
    }
  }
}

/**
 * @api {delete} /internal/checklist-item/:id Delete Checklist Item
 * @apiName DeleteChecklistItem
 * @apiGroup ChecklistItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a checklist item
 *
 * @apiParam {String} id Item identifier
 *
 * @apiSuccess {Object} data Success message
 *
 * @apiError {String} NotFoundError Item not found
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid('ID inválido'),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    await checklistItemDelete(validated.id);
    res.json(successResponse({ message: 'Item excluído com sucesso' }));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Erro de validação', 'VALIDATION_ERROR', error.errors));
    } else if (error.message.includes('não encontrado')) {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    } else {
      res.status(500).json(errorResponse(error.message, 'SERVER_ERROR'));
    }
  }
}
