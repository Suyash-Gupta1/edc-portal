export function isPrecomputedAdmin(email) {
  if (!process.env.ADMIN_EMAILS) return false;

  const adminList = process.env.ADMIN_EMAILS.split(",").map(e => e.trim());
  return adminList.includes(email);
}
