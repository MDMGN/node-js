import { DateFormat } from "../helpers.js";

export const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const now = Date.now();
    const duration = now - start;
    console.log(DateFormat(now));
    console.log(
      `${req.originalUrl}  [${req.method}][${res.statusCode}]  (${duration} ms)\n\r`,
    );
  });

  next();
};
