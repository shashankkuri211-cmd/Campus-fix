import { createClient } from '@supabase/supabase-js';
import { Ticket, Technician, Building, AppNotification } from './types';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://vtzqndozexiolnbabxvc.supabase.co';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_PDHteHNVQeNqexc4GI7WWA_8XuQp8SB';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Row mappers between PostgreSQL snake_case columns and TypeScript camelCase models

export function ticketToRow(ticket: Ticket) {
  return {
    id: ticket.id,
    title: ticket.title,
    category: ticket.category,
    building: ticket.building,
    location: ticket.location,
    priority: ticket.priority,
    status: ticket.status,
    reported_by: ticket.reportedBy,
    created_at: ticket.createdAt,
    technician: ticket.technician ?? null,
    eta: ticket.eta ?? null,
    upvotes: ticket.upvotes,
    user_upvoted: ticket.userUpvoted ?? false,
    description: ticket.description,
    hazards: ticket.hazards ?? [],
    flow_rate: ticket.flowRate ?? null,
    affected_area: ticket.affectedArea ?? null,
    moisture_level: ticket.moistureLevel ?? null,
    images: ticket.images ?? [],
    pipeline: ticket.pipeline ?? [],
    activity_logs: ticket.activityLogs ?? [],
    sector: ticket.sector ?? null,
  };
}

export function rowToTicket(row: Record<string, any>): Ticket {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    building: row.building,
    location: row.location,
    priority: row.priority,
    status: row.status,
    reportedBy: row.reported_by ?? row.reportedBy ?? 'Campus Resident',
    createdAt: row.created_at ?? row.createdAt ?? 'Recently',
    technician: row.technician ?? undefined,
    eta: row.eta ?? undefined,
    upvotes: typeof row.upvotes === 'number' ? row.upvotes : 0,
    userUpvoted: Boolean(row.user_upvoted ?? row.userUpvoted),
    description: row.description ?? '',
    hazards: Array.isArray(row.hazards) ? row.hazards : undefined,
    flowRate: row.flow_rate ?? row.flowRate ?? undefined,
    affectedArea: row.affected_area ?? row.affectedArea ?? undefined,
    moistureLevel: row.moisture_level ?? row.moistureLevel ?? undefined,
    images: Array.isArray(row.images) ? row.images : undefined,
    pipeline: Array.isArray(row.pipeline) ? row.pipeline : [],
    activityLogs: Array.isArray(row.activity_logs)
      ? row.activity_logs
      : Array.isArray(row.activityLogs)
      ? row.activityLogs
      : [],
    sector: row.sector ?? undefined,
  };
}

export function buildingToRow(b: Building) {
  return {
    id: b.id,
    name: b.name,
    code: b.code,
    sector: b.sector,
    active_tickets: b.activeTickets,
    health_score: b.healthScore,
    status: b.status,
    image: b.image,
    floors: b.floors,
    emergency_lead: b.emergencyLead,
  };
}

export function rowToBuilding(row: Record<string, any>): Building {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    sector: row.sector,
    activeTickets: row.active_tickets ?? row.activeTickets ?? 0,
    healthScore: row.health_score ?? row.healthScore ?? 100,
    status: row.status ?? 'Nominal',
    image: row.image ?? '',
    floors: row.floors ?? 1,
    emergencyLead: row.emergency_lead ?? row.emergencyLead ?? '',
  };
}

export function technicianToRow(t: Technician) {
  return {
    id: t.id,
    name: t.name,
    role: t.role,
    status: t.status,
    avatar: t.avatar,
    orders_count: t.ordersCount,
    sector: t.sector,
    phone: t.phone,
  };
}

export function rowToTechnician(row: Record<string, any>): Technician {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    status: row.status ?? 'active',
    avatar: row.avatar ?? '',
    ordersCount: row.orders_count ?? row.ordersCount ?? 0,
    sector: row.sector ?? '',
    phone: row.phone ?? '',
  };
}

export function notificationToRow(n: AppNotification) {
  return {
    id: n.id,
    title: n.title,
    description: n.description,
    time: n.time,
    read: n.read,
    ticket_id: n.ticketId ?? null,
    type: n.type,
  };
}

export function rowToNotification(row: Record<string, any>): AppNotification {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    time: row.time,
    read: Boolean(row.read),
    ticketId: row.ticket_id ?? row.ticketId ?? undefined,
    type: row.type ?? 'update',
  };
}
