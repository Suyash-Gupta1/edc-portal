(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
// Configuration
const ADMIN_KEY = "EDC_ADMIN_2024";
const WINDOW_MS = 60 * 1000; // 1 minute
const AUTH_LIMIT = 5; // Strict limit for auth routes
const GENERIC_LIMIT = 100; // Generous limit for data fetching
// In-memory store for Rate Limiting
// Note: In a distributed serverless env (like Vercel), this map is specific to the container instance.
// For enterprise scale, use Redis (e.g., Upstash). For this landing page, this is sufficient.
const rateLimitMap = new Map();
function middleware(request) {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const { pathname } = request.nextUrl;
    // Prepare response (we will attach headers to this)
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // --- 1. Security Headers ---
    // Apply standard security headers to all API responses
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    // We only care about protecting /api routes here
    if (!pathname.startsWith('/api')) {
        return response;
    }
    // --- 2. Admin Route Protection ---
    // Intercepts admin requests before they reach the handler
    if (pathname.startsWith('/api/admin')) {
        const apiKey = request.headers.get('admin-key');
        if (apiKey !== ADMIN_KEY) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized: Invalid or Missing Admin Key'
            }, {
                status: 401
            });
        }
    }
    // --- 3. Rate Limiting Strategy ---
    // Stricter limits for Auth, looser for general data
    const limit = pathname.startsWith('/api/auth') ? AUTH_LIMIT : GENERIC_LIMIT;
    const currentTime = Date.now();
    const record = rateLimitMap.get(ip) || {
        count: 0,
        lastReset: currentTime
    };
    // Reset window if time has passed
    if (currentTime - record.lastReset > WINDOW_MS) {
        record.count = 0;
        record.lastReset = currentTime;
    }
    // Check if limit exceeded
    if (record.count >= limit) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Too many requests. Please try again later.'
        }, {
            status: 429
        });
    }
    // Increment and update
    record.count += 1;
    rateLimitMap.set(ip, record);
    // Return the response with security headers attached
    return response;
}
const config = {
    matcher: '/api/:path*'
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map