import { supabase } from "@/lib/supabase";
import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return NextResponse.json({ spaces: [] }, { status: 200 });
    }

    // First, get the user's ID from the users table using clerk_user_id
    const { data: userData, error: userError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('clerk_user_id', clerkUser.id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }

    if (!userData) {
      return NextResponse.json({ spaces: [] }, { status: 200 });
    }

    // Fetch spaces for the user using the ID from users table
    const { data: spaces, error: spacesError } = await supabase
      .from('spaces')
      .select('name, url')
      .eq('id', userData.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (spacesError) {
      console.error('Error fetching spaces:', spacesError);
      return NextResponse.json({ error: 'Failed to fetch spaces' }, { status: 500 });
    }

    return NextResponse.json({ spaces: spaces || [] });
  } catch (error) {
    console.error('Error in spaces API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 