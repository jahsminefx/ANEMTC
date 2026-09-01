/**
 * WhatsApp URL Formatter
 * Sanitizes phone numbers into full international format without leading zeros or special characters.
 * Generates official API links compatible with iOS, Android, and Desktop WhatsApp Web.
 */

export function formatWhatsAppPhone(rawPhone, defaultCountryCode = '234') {
  if (!rawPhone) return '2349059916392';

  // Strip all non-numeric characters
  let cleaned = String(rawPhone).replace(/[^\d]/g, '');

  // If number starts with a local leading '0' (e.g. 09059916392 or 08012345678), replace leading '0' with country code
  if (cleaned.startsWith('0')) {
    cleaned = defaultCountryCode + cleaned.substring(1);
  }

  // If number is 10 digits without country code (e.g. 9059916392), prepend country code
  if (cleaned.length === 10 && !cleaned.startsWith('234') && !cleaned.startsWith('1')) {
    cleaned = defaultCountryCode + cleaned;
  }

  return cleaned;
}

export function buildWhatsAppUrl(phone, message = '') {
  const formattedPhone = formatWhatsAppPhone(phone);
  const encodedText = message ? encodeURIComponent(message) : '';
  
  // Official WhatsApp API link (works seamlessly across native mobile app, WhatsApp Web, and desktop)
  return `https://api.whatsapp.com/send?phone=${formattedPhone}${encodedText ? `&text=${encodedText}` : ''}`;
}
