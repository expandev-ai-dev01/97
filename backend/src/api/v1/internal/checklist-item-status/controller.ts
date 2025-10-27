/**
 * @module api/v1/internal/checklist-item-status/controller
 * @description Checklist item status toggle operations controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { checklistItemStatusToggle } from '@/services/checklistItemStatus';

/**
 * @api {patch} /internal/checklist-item-status/:id Toggle Item Status
 * @apiName ToggleItemStatus
 * @apiGroup ChecklistItemStatus
 * @apiVersion 1.0.0
 *
 * @apiDescription Toggles the verification status of a checklist item
 *
 * @apiParam {String} id Item identifier
 *
 * @apiSuccess {Object} data Updated item with new status
 * @apiSuccess {String} data.id Item identifier
 * @apiSuccess {String} data.checklist_id Checklist identifier
 * @apiSuccess {String} data.nome_item Item name
 * @apiSuccess {String} data.status New item status (pendente/verificado)
 * @apiSuccess {Date} data.data_atualizacao Update timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} NotFoundError Item not found
 */
export async function toggleStatusHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid('ID inválido'),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const data = await checklistItemStatusToggle(validated.id);
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
