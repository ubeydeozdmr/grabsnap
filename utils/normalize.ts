export function capitalize(string: string): string {
  return string.at(0)?.toUpperCase() + string.slice(1);
}

export function normalize(string: string): string {
  if (string.includes('-')) {
    return string
      .slice()
      .split('-')
      .map((part) => capitalize(part))
      .join(' ');
  }

  return capitalize(string);
}
