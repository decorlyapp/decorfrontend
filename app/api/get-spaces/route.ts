import { supabase } from "@/lib/supabase";
import { NextResponse } from 'next/server';
import { saveError } from '@/lib/log-error';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ spaces: [] }, { status: 200 });
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
        `Failed to fetch spaces for user ${userId}`,
        JSON.stringify(spacesError)
      );
      return NextResponse.json({ spaces: [] }, { status: 200 });
    }

    return NextResponse.json({ spaces: spaces || [] });
  } catch (error) {
    console.error('Error in spaces API:', error);
    await saveError(
      'Spaces API Error',
      '/api/get-spaces',
      'Internal server error in get-spaces endpoint',
      JSON.stringify(error)
    );
    return NextResponse.json({ spaces: [] }, { status: 200 });
  }
}