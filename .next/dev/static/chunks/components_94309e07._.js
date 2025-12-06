(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/NoiseOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NoiseOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function NoiseOverlay() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NoiseOverlay.useEffect": ()=>{
            if (!containerRef.current) return;
            const layers = Array.from(containerRef.current.querySelectorAll('.parallax-layer'));
            let animationFrameId;
            const render = {
                "NoiseOverlay.useEffect.render": ()=>{
                    const scrollY = window.scrollY;
                    layers.forEach({
                        "NoiseOverlay.useEffect.render": (layer)=>{
                            const speed = parseFloat(layer.getAttribute('data-speed') || '0.1');
                            layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
                        }
                    }["NoiseOverlay.useEffect.render"]);
                    if (containerRef.current) {
                        containerRef.current.style.setProperty('--mouse-x', `${mouseRef.current.x}px`);
                        containerRef.current.style.setProperty('--mouse-y', `${mouseRef.current.y}px`);
                    }
                    animationFrameId = requestAnimationFrame(render);
                }
            }["NoiseOverlay.useEffect.render"];
            const handleMouseMove = {
                "NoiseOverlay.useEffect.handleMouseMove": (e)=>{
                    mouseRef.current.x = e.clientX;
                    mouseRef.current.y = e.clientY;
                }
            }["NoiseOverlay.useEffect.handleMouseMove"];
            animationFrameId = requestAnimationFrame(render);
            window.addEventListener('mousemove', handleMouseMove, {
                passive: true
            });
            return ({
                "NoiseOverlay.useEffect": ()=>{
                    cancelAnimationFrame(animationFrameId);
                    window.removeEventListener('mousemove', handleMouseMove);
                }
            })["NoiseOverlay.useEffect"];
        }
    }["NoiseOverlay.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "fixed inset-0 z-0 pointer-events-none overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.03] z-[1]",
                style: {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    transform: 'translateZ(0)'
                }
            }, void 0, false, {
                fileName: "[project]/components/NoiseOverlay.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-[2]",
                style: {
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(204, 255, 0, 0.04), transparent 80%)`,
                    willChange: 'background'
                }
            }, void 0, false, {
                fileName: "[project]/components/NoiseOverlay.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-[-50%] w-[200%] h-[200%] opacity-[0.04] z-0",
                style: {
                    backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                    transform: 'translateZ(0)'
                }
            }, void 0, false, {
                fileName: "[project]/components/NoiseOverlay.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "parallax-layer absolute top-[10%] left-[5%] opacity-[0.05] text-white z-0",
                "data-speed": "0.15",
                style: {
                    willChange: 'transform'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "300",
                    height: "300",
                    viewBox: "0 0 100 100",
                    fill: "none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "50",
                        cy: "50",
                        r: "45",
                        stroke: "currentColor",
                        strokeWidth: "0.2",
                        strokeDasharray: "4 4"
                    }, void 0, false, {
                        fileName: "[project]/components/NoiseOverlay.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/NoiseOverlay.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NoiseOverlay.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "parallax-layer absolute top-[30%] right-[10%] opacity-[0.08] text-[#ccff00] z-0",
                "data-speed": "-0.1",
                style: {
                    willChange: 'transform'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "150",
                    height: "150",
                    viewBox: "0 0 100 100",
                    fill: "none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M50 20v60M20 50h60",
                        stroke: "currentColor",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/components/NoiseOverlay.tsx",
                        lineNumber: 98,
                        columnNumber: 12
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/NoiseOverlay.tsx",
                    lineNumber: 97,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NoiseOverlay.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "parallax-layer absolute bottom-[15%] left-[20%] opacity-[0.04] text-white z-0",
                "data-speed": "0.08",
                style: {
                    willChange: 'transform'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "250",
                    height: "250",
                    viewBox: "0 0 100 100",
                    fill: "none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "25",
                        y: "25",
                        width: "50",
                        height: "50",
                        stroke: "currentColor",
                        strokeWidth: "0.2",
                        transform: "rotate(15 50 50)"
                    }, void 0, false, {
                        fileName: "[project]/components/NoiseOverlay.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/NoiseOverlay.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NoiseOverlay.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "parallax-layer absolute top-[60%] right-[25%] opacity-[0.03] text-white z-0",
                "data-speed": "-0.05",
                style: {
                    willChange: 'transform'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "200",
                    height: "200",
                    viewBox: "0 0 100 100",
                    fill: "none",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M30 30 L10 50 L30 70 M70 30 L90 50 L70 70",
                        strokeWidth: "0.5",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/NoiseOverlay.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/NoiseOverlay.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NoiseOverlay.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-[3]",
                style: {
                    background: 'radial-gradient(circle at center, transparent 0%, #050505 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/NoiseOverlay.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NoiseOverlay.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(NoiseOverlay, "+nF1yJvQLVO//ZYCcNavPZmnV1A=");
_c = NoiseOverlay;
var _c;
__turbopack_context__.k.register(_c, "NoiseOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CustomCursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CustomCursor() {
    _s();
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cursorDotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomCursor.useEffect": ()=>{
            if (!cursorRef.current || !cursorDotRef.current) return;
            const cursor = cursorRef.current;
            const cursorDot = cursorDotRef.current;
            // Variables for smooth movement
            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;
            const speed = 0.15;
            const animate = {
                "CustomCursor.useEffect.animate": ()=>{
                    // Linear interpolation for smooth lag
                    const distX = mouseX - cursorX;
                    const distY = mouseY - cursorY;
                    cursorX = cursorX + distX * speed;
                    cursorY = cursorY + distY * speed;
                    // Use translate3d for GPU acceleration
                    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
                    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
                    requestAnimationFrame(animate);
                }
            }["CustomCursor.useEffect.animate"];
            const handleMouseMove = {
                "CustomCursor.useEffect.handleMouseMove": (e)=>{
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                }
            }["CustomCursor.useEffect.handleMouseMove"];
            const handleHoverEvents = {
                "CustomCursor.useEffect.handleHoverEvents": (e)=>{
                    const target = e.target;
                    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.getAttribute('contenteditable') === 'true';
                    const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer');
                    // 1. Hide/Show Cursor for Inputs (Cursor disappears for text fields)
                    if (isInput) {
                        cursor.classList.add('is-hidden');
                        cursorDot.classList.add('is-hidden');
                    } else {
                        cursor.classList.remove('is-hidden');
                        cursorDot.classList.remove('is-hidden');
                    }
                    // 2. Expand DOT for Clickables (Inner circle expands, Outer ring remains normal)
                    if (isClickable && !isInput) {
                        cursorDot.classList.add('is-hovering-dot');
                        // Ensure the ring is visible but NOT expanding
                        cursor.classList.remove('is-hovering');
                    } else {
                        cursorDot.classList.remove('is-hovering-dot');
                        cursor.classList.remove('is-hovering');
                    }
                }
            }["CustomCursor.useEffect.handleHoverEvents"];
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseover', handleHoverEvents);
            const animationId = requestAnimationFrame(animate);
            return ({
                "CustomCursor.useEffect": ()=>{
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('mouseover', handleHoverEvents);
                    cancelAnimationFrame(animationId);
                }
            })["CustomCursor.useEffect"];
        }
    }["CustomCursor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "3ec808163f95eddc",
                children: "@media (hover:hover) and (pointer:fine){body,a,button,[role=button]{cursor:none}input,textarea,select{cursor:text!important}}.custom-cursor-dot{z-index:10000;pointer-events:none;mix-blend-mode:difference;background-color:#cf0;border-radius:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;transition:opacity .2s ease-in-out,transform .3s cubic-bezier(.25,1,.5,1),width .3s cubic-bezier(.25,1,.5,1),height .3s cubic-bezier(.25,1,.5,1),margin .3s cubic-bezier(.25,1,.5,1);position:fixed;top:0;left:0}.custom-cursor-dot.is-hovering-dot{background-color:#cf0;width:36px;height:36px;margin-top:-18px;margin-left:-18px;transform:scale(1)}.custom-cursor-ring{z-index:9999;pointer-events:none;mix-blend-mode:difference;border:1px solid #ffffff80;border-radius:50%;width:40px;height:40px;margin-top:-20px;margin-left:-20px;transition:background-color .3s,border-color .3s,opacity .2s;position:fixed;top:0;left:0}.custom-cursor-ring.is-hovering{border-color:#ccff0080;width:40px;height:40px}.custom-cursor-dot.is-hidden,.custom-cursor-ring.is-hidden{opacity:0}@media (width<=768px){.custom-cursor-dot,.custom-cursor-ring{display:none}body{cursor:auto}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cursorDotRef,
                className: "jsx-3ec808163f95eddc" + " " + "custom-cursor-dot"
            }, void 0, false, {
                fileName: "[project]/components/CustomCursor.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cursorRef,
                className: "jsx-3ec808163f95eddc" + " " + "custom-cursor-ring"
            }, void 0, false, {
                fileName: "[project]/components/CustomCursor.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(CustomCursor, "hHx+5D7RGPMK8jYIzxHS/HpIoRg=");
_c = CustomCursor;
var _c;
__turbopack_context__.k.register(_c, "CustomCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SmoothScroll.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SmoothScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SmoothScroll({ children }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmoothScroll.useEffect": ()=>{
            // 1. Initialize Lenis with "Luxury" settings
            const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                // Increased momentum duration
                duration: 1.5,
                easing: {
                    "SmoothScroll.useEffect": (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t))
                }["SmoothScroll.useEffect"],
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                // Reduced multiplier for a heavier, more controlled feel
                wheelMultiplier: 0.8,
                touchMultiplier: 2
            });
            // 2. Animation Frame Loop (Required for Lenis to work smoothly)
            // This links Lenis updates directly to the screen refresh rate (60fps)
            let frameId;
            function raf(time) {
                lenis.raf(time);
                frameId = requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            // 3. Cleanup: Stop the engine and loop when the component unmounts
            return ({
                "SmoothScroll.useEffect": ()=>{
                    cancelAnimationFrame(frameId);
                    lenis.destroy();
                }
            })["SmoothScroll.useEffect"];
        }
    }["SmoothScroll.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/SmoothScroll.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(SmoothScroll, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SmoothScroll;
var _c;
__turbopack_context__.k.register(_c, "SmoothScroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_94309e07._.js.map