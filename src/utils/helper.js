export function checkHeading(string) {
  return /^(\*)(\*)(.*)\*$/.test(string);
}

export function headingStart(string) {
  return string.replace(/^(\*)(\*)|(\*)$/g, "");
}
