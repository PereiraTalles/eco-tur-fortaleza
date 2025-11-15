export function notFound(req, res) {
  return res.status(404).json({ error: "route_not_found" });
}

export function errorHandler(err, req, res, _next) {
  console.error("[ERROR]", err);
  const status = err.statusCode || 500;
  return res.status(status).json({ error: "internal_error", message: err.message });
}
