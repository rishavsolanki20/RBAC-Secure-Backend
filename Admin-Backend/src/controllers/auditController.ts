import { Request, Response } from 'express';
import AuditLog from '../models/auditLogModel';

export const logAction = async (adminId: string, action: string, details?: string, p0?: string): Promise<void> => {
    try {
        const auditLog = new AuditLog({ adminId, action, details });
        await auditLog.save();
    } catch (error) {
        console.error('Failed to log action:', error);
    }
};

export const getAuditLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const auditLogs = await AuditLog.find({});
        res.json(auditLogs);
    } catch (error) {
        res.status(500).send('Failed to fetch audit logs');
    }
};
