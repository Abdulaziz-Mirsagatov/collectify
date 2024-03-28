export default function isIsoDate(dateString: string) {
  const isoDatePattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/;
  return isoDatePattern.test(dateString);
}
