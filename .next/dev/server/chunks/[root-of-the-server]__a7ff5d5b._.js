module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
// User provided URI as fallback.
// IMPORTANT: You must replace <db_password> with your actual MongoDB password.
const FALLBACK_URI = "mongodb+srv://SuyashGupta:<db_password>@cluster0.dgobo2d.mongodb.net/?appName=Cluster0";
const MONGODB_URI = process.env.MONGODB_URI || FALLBACK_URI;
let cached = globalThis.mongoose;
if (!cached) {
    cached = globalThis.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Check if the placeholder is still present
    if (MONGODB_URI.includes('<db_password>')) {
        throw new Error('Invalid MongoDB URI: Please replace <db_password> with your actual database password in lib/db.ts');
    }
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = dbConnect;
}),
"[project]/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    username: {
        type: String,
        required: [
            true,
            'Please provide a username'
        ],
        unique: true
    },
    email: {
        type: String,
        required: [
            true,
            'Please provide an email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [
            true,
            'Please provide a password'
        ]
    },
    domain: {
        type: String,
        required: [
            true,
            'Please select a domain'
        ]
    },
    // Tracks the selection round: 0 (Applied), 1-3 (Interview Rounds), 4 (Selected)
    round: {
        type: Number,
        default: 0
    },
    hasSelection: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Explicitly type the model to avoid Union type errors in Next.js API routes
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('User', UserSchema);
const __TURBOPACK__default__export__ = User;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/lib/mail.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendStatusEmail",
    ()=>sendStatusEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
;
// Configure these in your .env.local file
// EMAIL_USER=your-email@gmail.com
// EMAIL_PASS=your-app-specific-password
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendStatusEmail = async (email, username, round, domain)=>{
    // If credentials aren't set, log to console (for development/demo)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log(`[Mock Email] To: ${email} | Subject: Round ${round} Update | User: ${username}`);
        return;
    }
    let subject = '';
    let htmlContent = '';
    const commonStyle = `
    font-family: sans-serif; 
    color: #333; 
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
  `;
    const header = `
    <div style="background-color: #000; padding: 15px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ccff00; margin: 0;">EDC Recruitment</h2>
    </div>
  `;
    switch(round){
        case 1:
            subject = 'Update: EDC Recruitment Round 1';
            htmlContent = `
        ${header}
        <div style="padding: 20px;">
            <h3>Hello ${username},</h3>
            <p>Congratulations! You have cleared the initial screening for the <strong>${domain}</strong> domain.</p>
            <p>You have been shortlisted for <strong>Round 1</strong> (Personal Interview). Details regarding the schedule will be shared shortly.</p>
            <p>Best Regards,<br/>EDC Team</p>
        </div>
      `;
            break;
        case 2:
            subject = 'Update: Advanced to Round 2';
            htmlContent = `
        ${header}
        <div style="padding: 20px;">
            <h3>Great Job, ${username}!</h3>
            <p>We are pleased to inform you that you have successfully cleared Round 1.</p>
            <p>You are now advancing to <strong>Round 2</strong> (Technical/Task Round) for the <strong>${domain}</strong> domain.</p>
            <p>Keep up the momentum!</p>
            <p>Best Regards,<br/>EDC Team</p>
        </div>
      `;
            break;
        case 3:
            subject = 'Update: Final Interview Round';
            htmlContent = `
        ${header}
        <div style="padding: 20px;">
            <h3>Almost There, ${username}!</h3>
            <p>Your performance has been impressive. You have been selected for the <strong>Final Interview (Round 3)</strong>.</p>
            <p>This is the last step in the recruitment process for the <strong>${domain}</strong> domain.</p>
            <p>Best Regards,<br/>EDC Team</p>
        </div>
      `;
            break;
        case 4:
            subject = 'Congratulations! Welcome to EDC';
            htmlContent = `
        ${header}
        <div style="padding: 20px; border-left: 4px solid #ccff00;">
            <h2 style="color: #000;">Welcome to the Team!</h2>
            <p>Dear ${username},</p>
            <p>We are thrilled to invite you to join the <strong>Entrepreneurship Development Cell</strong>.</p>
            <p>You have been officially selected for the <strong>${domain}</strong> domain.</p>
            <p>Get ready to innovate, ideate, and incubate!</p>
            <p>Cheers,<br/>EDC NIT Durgapur</p>
        </div>
      `;
            break;
        default:
            return; // Do not send email for demotions or round 0
    }
    try {
        await transporter.sendMail({
            from: `"EDC Recruitment" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: `<div style="${commonStyle}">${htmlContent}</div>`
        });
        console.log(`Email sent to ${email} for Round ${round}`);
    } catch (error) {
        console.error('Error sending email:', error);
    // Don't throw error here to prevent blocking the API response
    }
};
}),
"[project]/app/api/admin/update/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/User.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mail.ts [app-route] (ecmascript)");
;
;
;
;
const ADMIN_KEY = "EDC_ADMIN_2024";
async function POST(req) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
    const apiKey = req.headers.get('admin-key');
    if (apiKey !== ADMIN_KEY) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
    }
    try {
        const body = await req.json();
        const { userId, round } = body;
        if (!userId || typeof round !== 'number') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid data'
            }, {
                status: 400
            });
        }
        // 1. Fetch current user state BEFORE update to check if this is a promotion
        const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(userId);
        if (!currentUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'User not found'
            }, {
                status: 404
            });
        }
        // Determine hasSelection based on round (Round 4 = Selected)
        const hasSelection = round >= 4;
        // 2. Update the user
        const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(userId, {
            round: round,
            hasSelection: hasSelection
        }, {
            new: true
        });
        // 3. Send Email ONLY if the round has increased (Promotion)
        // We await this to ensure the serverless function doesn't terminate before sending
        if (round > currentUser.round) {
            console.log(`[Email Trigger] Promoting ${updatedUser.username} to Round ${round}`);
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendStatusEmail"])(updatedUser.email, updatedUser.username, round, updatedUser.domain);
                console.log(`[Email Success] Sent to ${updatedUser.email}`);
            } catch (emailError) {
                console.error("[Email Failure]", emailError);
            // Non-blocking error for the API response, but logged.
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a7ff5d5b._.js.map