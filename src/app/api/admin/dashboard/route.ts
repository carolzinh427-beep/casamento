import { NextResponse } from 'next/server';
import { getDashboardMetrics } from '@/lib/db';

export async function GET() {
  try {
    const metrics = await getDashboardMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao carregar dados do painel' },
      { status: 500 }
    );
  }
}
