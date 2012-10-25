function truncateString(s, len) {
  if (len==undefined) throw "Missing parameter length"
  return s.substr(0,len);
}