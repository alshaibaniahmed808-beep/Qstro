-- QSTRO Supabase schema (Postgres)
-- Run this in Supabase SQL Editor

-- 1) Profiles / Users
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null default 'user' check (role in ('user', 'dealer', 'admin')),
  created_at timestamptz not null default now()
);

-- 2) Cars
create table if not exists public.cars (
  id bigint generated always as identity primary key,
  title text not null,
  price numeric(12,2) not null check (price >= 0),
  city text not null,
  description text not null,
  images text[] not null default '{}',
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  is_featured boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'))
);

-- 3) Messages
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  sender_id uuid not null references public.users(id) on delete cascade,
  receiver_id uuid not null references public.users(id) on delete cascade,
  car_id bigint not null references public.cars(id) on delete cascade,
  message text not null,
  created_at timestamptz not null default now()
);

-- 4) Subscriptions
create table if not exists public.subscriptions (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  plan text not null check (plan in ('starter', 'pro', 'premium')),
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

-- 5) Payments
create table if not exists public.payments (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  proof_image text not null,
  status text not null default 'pending' check (status in ('pending', 'approved')),
  created_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists idx_cars_city on public.cars(city);
create index if not exists idx_cars_price on public.cars(price);
create index if not exists idx_cars_created_at on public.cars(created_at desc);
create index if not exists idx_messages_car_id on public.messages(car_id);
create index if not exists idx_messages_sender_receiver on public.messages(sender_id, receiver_id);

-- Realtime
alter publication supabase_realtime add table public.messages;

-- Basic RLS
alter table public.users enable row level security;
alter table public.cars enable row level security;
alter table public.messages enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;


-- RLS policies
create policy users_select_self on public.users for select using (auth.uid() = id);
create policy users_update_self on public.users for update using (auth.uid() = id);

create policy cars_public_read on public.cars for select using (status = 'approved' or auth.uid() = user_id);
create policy cars_insert_own on public.cars for insert with check (auth.uid() = user_id);
create policy cars_update_own on public.cars for update using (auth.uid() = user_id);
create policy cars_delete_own on public.cars for delete using (auth.uid() = user_id);

create policy messages_participants_read on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy messages_participants_send on public.messages for insert with check (auth.uid() = sender_id);

create policy subscriptions_read_own on public.subscriptions for select using (auth.uid() = user_id);
create policy subscriptions_write_admin_service on public.subscriptions for all using (auth.jwt() ->> 'role' = 'service_role');

create policy payments_read_own on public.payments for select using (auth.uid() = user_id);
create policy payments_insert_own on public.payments for insert with check (auth.uid() = user_id);
