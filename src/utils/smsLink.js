function getCleanPhoneNumbers(phoneNumbers) {
  return phoneNumbers
    .map((phoneNumber) => String(phoneNumber || "").trim())
    .filter(Boolean);
}

function isAppleMobileDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function createSmsLink(phoneNumbers, message) {
  const recipients = getCleanPhoneNumbers(phoneNumbers);
  const encodedMessage = encodeURIComponent(message);

  if (recipients.length === 0) {
    return "";
  }

  if (isAppleMobileDevice() && recipients.length > 1) {
    const addresses = recipients.map(encodeURIComponent).join(",");
    return `sms:/open?addresses=${addresses}&body=${encodedMessage}`;
  }

  return `sms:${recipients.join(",")}?body=${encodedMessage}`;
}
