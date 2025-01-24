import { Schema, model, Document } from 'mongoose';

interface IAuditLog extends Document {
    action: string;
    adminId: Schema.Types.ObjectId;
    timestamp: Date;
    details?: string;
}

const auditLogSchema = new Schema<IAuditLog>({
    action: { type: String, required: true },
    adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String }
});

const AuditLog = model<IAuditLog>('AuditLog', auditLogSchema);

export default AuditLog;
