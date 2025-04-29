#!/usr/bin/env bash

set -euo pipefail

URL="${1:-http://127.0.0.1/api/v1}"

# Required headers
required=(
  content-security-policy
  x-frame-options
  x-content-type-options
  referrer-policy
  permissions-policy
  cache-control
)

# ---------- 1. Download headers only ----------
TMP_DIR=$(mktemp -d)
RAW="$TMP_DIR/headers.txt"

# -sS silent, -I HEAD only. We DON'T use -f to avoid aborting on 404.
curl -sSI "$URL" | tr -d '\r' > "$RAW" || true   # never abort here

# ---------- 2. Mark found headers ----------
declare -A found
for h in "${required[@]}"; do
  found[$h]=false
done

while IFS= read -r line; do
  [[ $line == *:* ]] || continue
  name=${line%%:*}
  key=$(echo "$name" | tr '[:upper:]' '[:lower:]' | xargs)

  [[ -n $key && -v "found[$key]" ]] && found[$key]=true
done < "$RAW"


# ---------- 3. Detect missing headers ----------
missing=false
for h in "${required[@]}"; do
  if [[ "${found[$h]}" != "true" ]]; then
    echo "❌ Missing header: $h" >&2
    missing=true
  fi
done

# ---------- 4. Generate JSON ALWAYS ----------
OUT=tmp
mkdir -p "$OUT"

{
  echo '{'
  last=$(( ${#required[@]} - 1 ))
  for i in "${!required[@]}"; do
    k="${required[$i]}"
    if (( i < last )); then
      printf '  "%s": %s,\n' "$k" "${found[$k]}"
    else
      printf '  "%s": %s\n'  "$k" "${found[$k]}"
    fi
  done
  echo '}'
} > "$OUT/headers.json"


# ---------- 5. Return appropriate code ----------
if $missing; then
  exit 1
else
  echo "✔️  All headers present"
fi





