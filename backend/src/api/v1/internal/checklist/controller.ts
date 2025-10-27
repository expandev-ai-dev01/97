/**
 * @module api/v1/internal/checklist/controller
 * @description Checklist CRUD operations controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import {
  checklistCreate,
  checklistList,
  checklistGet,
  checklistUpdate,
  checklistDelete,
} from '@/services/checklist';
import { TRIP_TYPES, TripType } from '@/constants/checklist';

/**
 * @api {get} /internal/checklist List Checklists
 * @apiName ListChecklists
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all checklists with summary information
 *
 * @apiSuccess {Array} data Array of checklists
 * @apiSuccess {String} data.id Checklist identifier
 * @apiSuccess {String} data.nome_checklist Checklist name
 * @apiSuccess {String} data.tipo_viagem Trip type
 * @apiSuccess {String} data.descricao Description
 * @apiSuccess {Date} data.data_criacao Creation date
 * @apiSuccess {Number} data.total_itens Total items count
 * @apiSuccess {Number} data.itens_verificados Verified items count
 *
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await checklistList();
    res.json(successResponse(data));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message, 'SERVER_ERROR'));
  }
}

/**
 * @api {post} /internal/checklist Create Checklist
 * @apiName CreateChecklist
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new checklist
 *
 * @apiParam {String} nome_checklist Checklist name (3-50 characters)
 * @apiParam {String} tipo_viagem Trip type
 * @apiParam {String} [descricao] Optional description (max 200 characters)
 *
 * @apiSuccess {Object} data Created checklist
 * @apiSuccess {String} data.id Checklist identifier
 * @apiSuccess {String} data.nome_checklist Checklist name
 * @apiSuccess {String} data.tipo_viagem Trip type
 * @apiSuccess {String} data.descricao Description
 * @apiSuccess {Date} data.data_criacao Creation timestamp
 * @apiSuccess {Date} data.data_atualizacao Update timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} DuplicateError Checklist name already exists
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const bodySchema = z.object({
    nome_checklist: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(50, 'O nome deve ter no máximo 50 caracteres')
      .regex(
        /^[a-zA-Z0-9\s\-_]+$/,
        'O nome não pode conter caracteres especiais exceto hífen e underscore'
      ),
    tipo_viagem: z.nativeEnum(TripType, {
      errorMap: () => ({ message: 'Selecione um tipo de viagem' }),
    }),
    descricao: z.string().max(200, 'A descrição deve ter no máximo 200 caracteres').optional(),
  });

  try {
    const validated = bodySchema.parse(req.body);
    const data = await checklistCreate(validated);
    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Erro de validação', 'VALIDATION_ERROR', error.errors));
    } else if (error.message.includes('já possui um checklist')) {
      res.status(400).json(errorResponse(error.message, 'DUPLICATE_ERROR'));
    } else {
      res.status(500).json(errorResponse(error.message, 'SERVER_ERROR'));
    }
  }
}

/**
 * @api {get} /internal/checklist/:id Get Checklist
 * @apiName GetChecklist
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a checklist by ID with all items
 *
 * @apiParam {String} id Checklist identifier
 *
 * @apiSuccess {Object} data Checklist with items
 * @apiSuccess {String} data.id Checklist identifier
 * @apiSuccess {String} data.nome_checklist Checklist name
 * @apiSuccess {String} data.tipo_viagem Trip type
 * @apiSuccess {String} data.descricao Description
 * @apiSuccess {Date} data.data_criacao Creation timestamp
 * @apiSuccess {Date} data.data_atualizacao Update timestamp
 * @apiSuccess {Array} data.itens Checklist items
 * @apiSuccess {Number} data.total_itens Total items count
 * @apiSuccess {Number} data.itens_verificados Verified items count
 * @apiSuccess {Number} data.progresso Progress percentage
 *
 * @apiError {String} NotFoundError Checklist not found
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid('ID inválido'),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const data = await checklistGet(validated.id);
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
 * @api {put} /internal/checklist/:id Update Checklist
 * @apiName UpdateChecklist
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing checklist
 *
 * @apiParam {String} id Checklist identifier
 * @apiParam {String} nome_checklist Checklist name (3-50 characters)
 * @apiParam {String} tipo_viagem Trip type
 * @apiParam {String} [descricao] Optional description (max 200 characters)
 *
 * @apiSuccess {Object} data Updated checklist
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} NotFoundError Checklist not found
 * @apiError {String} DuplicateError Checklist name already exists
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
    nome_checklist: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(50, 'O nome deve ter no máximo 50 caracteres')
      .regex(
        /^[a-zA-Z0-9\s\-_]+$/,
        'O nome não pode conter caracteres especiais exceto hífen e underscore'
      ),
    tipo_viagem: z.nativeEnum(TripType, {
      errorMap: () => ({ message: 'Selecione um tipo de viagem' }),
    }),
    descricao: z.string().max(200, 'A descrição deve ter no máximo 200 caracteres').optional(),
  });

  try {
    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const data = await checklistUpdate({
      id: validatedParams.id,
      ...validatedBody,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Erro de validação', 'VALIDATION_ERROR', error.errors));
    } else if (error.message.includes('não encontrado')) {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    } else if (error.message.includes('já possui outro checklist')) {
      res.status(400).json(errorResponse(error.message, 'DUPLICATE_ERROR'));
    } else {
      res.status(500).json(errorResponse(error.message, 'SERVER_ERROR'));
    }
  }
}

/**
 * @api {delete} /internal/checklist/:id Delete Checklist
 * @apiName DeleteChecklist
 * @apiGroup Checklist
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a checklist and all its items
 *
 * @apiParam {String} id Checklist identifier
 *
 * @apiSuccess {Object} data Success message
 *
 * @apiError {String} NotFoundError Checklist not found
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
    await checklistDelete(validated.id);
    res.json(successResponse({ message: 'Checklist excluído com sucesso' }));
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
