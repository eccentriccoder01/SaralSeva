import helmet from "helmet";
import hpp from "hpp";

export const securityMiddleware = (app) => {
    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            xssFilter: true,
            frameguard: { action: "deny" },
            hidePoweredBy: true,
        })
    );

    app.use(hpp());
};