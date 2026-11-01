-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/vtzqndozexiolnbabxvc/sql/new)

create table if not exists public.buildings (
  id text primary key,
  name text not null,
  code text not null,
  sector text not null,
  active_tickets integer default 0,
  health_score integer default 100,
  status text default 'Nominal',
  floors integer default 1,
  emergency_lead text,
  image text
);

create table if not exists public.technicians (
  id text primary key,
  name text not null,
  role text not null,
  status text default 'active',
  avatar text,
  orders_count integer default 0,
  sector text,
  phone text
);

create table if not exists public.tickets (
  id text primary key,
  title text not null,
  category text not null,
  building text not null,
  location text not null,
  priority text not null,
  status text default 'Pending',
  reported_by text not null,
  created_at text not null,
  technician text,
  eta text,
  upvotes integer default 1,
  user_upvoted boolean default false,
  description text not null,
  hazards jsonb default '[]'::jsonb,
  flow_rate text,
  affected_area text,
  moisture_level text,
  images jsonb default '[]'::jsonb,
  pipeline jsonb default '[]'::jsonb,
  activity_logs jsonb default '[]'::jsonb,
  sector text,
  inserted_at timestamptz default now()
);

create table if not exists public.notifications (
  id text primary key,
  title text not null,
  description text not null,
  time text not null,
  read boolean default false,
  ticket_id text,
  type text not null,
  inserted_at timestamptz default now()
);

alter table public.buildings enable row level security;
alter table public.technicians enable row level security;
alter table public.tickets enable row level security;
alter table public.notifications enable row level security;

drop policy if exists "Allow public read/write on buildings" on public.buildings;
create policy "Allow public read/write on buildings" on public.buildings for all using (true) with check (true);

drop policy if exists "Allow public read/write on technicians" on public.technicians;
create policy "Allow public read/write on technicians" on public.technicians for all using (true) with check (true);

drop policy if exists "Allow public read/write on tickets" on public.tickets;
create policy "Allow public read/write on tickets" on public.tickets for all using (true) with check (true);

drop policy if exists "Allow public read/write on notifications" on public.notifications;
create policy "Allow public read/write on notifications" on public.notifications for all using (true) with check (true);
