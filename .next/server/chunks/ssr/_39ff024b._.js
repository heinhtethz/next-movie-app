module.exports = [
"[project]/lib/fetchData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
async function fetchMovieDetail(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`
        }
    });
    return await res.json();
}
async function fetchCast(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`
        }
    });
    const result = await res.json();
    return result.cast;
}
async function fetchMoviesByGenre(id) {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`
        }
    });
    const data = await res.json();
    return data.results;
}
async function fetchGenres() {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`
        }
    });
    const data = await res.json();
    return data.genres;
}
async function fetchCrew(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`
        }
    });
    const result = await res.json();
    return result.crew;
}
async function fetchCastDetails(id) {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`
        }
    });
    const result = await res.json();
    return result;
}
}),
"[project]/app/person/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Person
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fetchData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function Person() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const id = pathname.split("/")[2];
    const castDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetchData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchCastDetails"])(Number(id));
    console.log(castDetails);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "hello"
    }, void 0, false, {
        fileName: "[project]/app/person/[id]/page.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=_39ff024b._.js.map