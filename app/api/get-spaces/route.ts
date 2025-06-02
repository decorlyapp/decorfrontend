import { supabase } from "@/lib/supabase";
import { NextResponse } from 'next/server';
import { saveError } from '@/lib/log-error';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Fetch spaces for the user using the provided userId
    const { data: spaces, error: spacesError } = await supabase
      .from('spaces')
      .select('name, url')
      .eq('id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (spacesError) {
      console.error('Error fetching spaces:', spacesError);
      await saveError(
        'Spaces Fetch Error',
        '/api/get-spaces',
        `Failed to fetch spaces for user ${userId}\n\n${JSON.stringify(spacesError)}`,
        request.url
      );
      return NextResponse.json(
        { error: 'Failed to fetch spaces' },
        { status: 500 }
      );
    }

    return NextResponse.json({ spaces: spaces || [] }, { status: 200 });
  } catch (error) {
    console.error('Error in spaces API:', error);
    await saveError(
        'Spaces Fetch Exception Error',
        '/api/get-spaces',
        `Failed to fetch spaces\n\n${JSON.stringify(error)}`,
        request.url
    );
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}