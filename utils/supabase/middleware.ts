import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user }, error } = await supabase.auth.getUser();

    // Public routes
    if (['/sign-in', '/sign-up', '/'].includes(request.nextUrl.pathname)) {
      if (user && !error) {
        const role = user.user_metadata.role;
        const onboarded = user.user_metadata.onboarded;
        
        if (!onboarded) {
          return NextResponse.redirect(new URL(`/onboarding/${role}`, request.url));
        }
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
      }
      return response;
    }

    // Protected routes
    if (!user || error) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Onboarding routes
    if (request.nextUrl.pathname.startsWith('/onboarding')) {
      const role = user.user_metadata.role;
      if (user.user_metadata.onboarded) {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
      }
    }

    // Dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      const role = user.user_metadata.role;
      const requestedRole = request.nextUrl.pathname.split('/')[2];
      
      if (role !== requestedRole) {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
