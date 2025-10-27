/**
 * @module routes/v1/internalRoutes
 * @description Internal (authenticated) API routes configuration
 */

import { Router } from 'express';
import * as checklistController from '@/api/v1/internal/checklist/controller';
import * as checklistItemController from '@/api/v1/internal/checklist-item/controller';
import * as checklistItemStatusController from '@/api/v1/internal/checklist-item-status/controller';

const router = Router();

// Checklist routes
router.get('/checklist', checklistController.listHandler);
router.post('/checklist', checklistController.createHandler);
router.get('/checklist/:id', checklistController.getHandler);
router.put('/checklist/:id', checklistController.updateHandler);
router.delete('/checklist/:id', checklistController.deleteHandler);

// Checklist item routes
router.post('/checklist-item', checklistItemController.createHandler);
router.put('/checklist-item/:id', checklistItemController.updateHandler);
router.delete('/checklist-item/:id', checklistItemController.deleteHandler);

// Checklist item status routes
router.patch('/checklist-item-status/:id', checklistItemStatusController.toggleStatusHandler);

export default router;
