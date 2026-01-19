(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/fetchData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchCast",
    ()=>fetchCast,
    "fetchCastDetails",
    ()=>fetchCastDetails,
    "fetchCrew",
    ()=>fetchCrew,
    "fetchGenres",
    ()=>fetchGenres,
    "fetchMovieDetail",
    ()=>fetchMovieDetail,
    "fetchMoviesByGenre",
    ()=>fetchMoviesByGenre
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
async function fetchMovieDetail(id) {
    const res = await fetch("https://api.themoviedb.org/3/movie/".concat(id), {
        headers: {
            Authorization: "Bearer ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TMDB_KEY)
        }
    });
    return await res.json();
}
async function fetchCast(id) {
    const res = await fetch("https://api.themoviedb.org/3/movie/".concat(id, "/credits"), {
        headers: {
            Authorization: "Bearer ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TMDB_KEY)
        }
    });
    const result = await res.json();
    return result.cast;
}
async function fetchMoviesByGenre(id) {
    const res = await fetch("https://api.themoviedb.org/3/discover/movie?with_genres=".concat(id), {
        headers: {
            Authorization: "Bearer ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TMDB_KEY)
        }
    });
    const data = await res.json();
    return data.results;
}
async function fetchGenres() {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
            Authorization: "Bearer ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TMDB_KEY)
        }
    });
    const data = await res.json();
    return data.genres;
}
async function fetchCrew(id) {
    const res = await fetch("https://api.themoviedb.org/3/movie/".concat(id, "/credits"), {
        headers: {
            Authorization: "Bearer ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TMDB_KEY)
        }
    });
    const result = await res.json();
    return result.crew;
}
async function fetchCastDetails(id) {
    const res = await fetch("https://api.themoviedb.org/3/person/".concat(id), {
        headers: {
            Authorization: "Bearer ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TMDB_KEY)
        }
    });
    const result = await res.json();
    return result;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/person/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Person
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fetchData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Person() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const id = pathname.split("/")[2];
    const castDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCastDetails"])(Number(id));
    console.log(castDetails);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "hello"
    }, void 0, false, {
        fileName: "[project]/app/person/[id]/page.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_s(Person, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Person;
var _c;
__turbopack_context__.k.register(_c, "Person");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2695b4a4._.js.map