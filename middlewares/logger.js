export const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(new Date().toDateString());
    console.log(
      `${req.originalUrl}  [${req.method}][${res.statusCode}]  (${duration} ms)\n\r`,
    );
  });

  next();
};
