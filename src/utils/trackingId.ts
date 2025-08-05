export const generateTrackingId = () => {
  const date = new Date();
  const yyyyMMdd = date.toISOString().split("T")[0].replace(/-/g, "");
  const random = Math.floor(100000 + Math.random() * 900000);
  return `TRK-${yyyyMMdd}-${random}`;
};
