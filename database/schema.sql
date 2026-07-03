-- IT 부캐 찾기 MBTI 테스트 - Supabase 스키마
-- Supabase 프로젝트의 SQL Editor에서 아래 스크립트를 실행하세요.

create extension if not exists "pgcrypto";

create table if not exists public.mbti_results (
  id uuid primary key default gen_random_uuid(),
  mbti_type text not null check (char_length(mbti_type) = 4),
  answers jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.mbti_results enable row level security;

-- 익명 사용자가 결과를 저장(적재)할 수 있도록 허용
create policy "Allow anonymous insert"
  on public.mbti_results
  for insert
  to anon
  with check (true);

-- 익명 사용자가 실시간 참여자 수 카운팅을 위해 조회할 수 있도록 허용
create policy "Allow anonymous select"
  on public.mbti_results
  for select
  to anon
  using (true);

create index if not exists mbti_results_mbti_type_idx on public.mbti_results (mbti_type);
create index if not exists mbti_results_created_at_idx on public.mbti_results (created_at desc);
