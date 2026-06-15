import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("/board", "routes/board.tsx"),
    route("/jobs", "routes/jobs.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),
    route("/login", "routes/login.tsx"),
    route("/logout", "routes/logout.tsx"),
    route("/register", "routes/register.tsx"),
] satisfies RouteConfig;