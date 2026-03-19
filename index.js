#!/usr/bin/env node
'use strict';

const args = process.argv.slice(2);

function usage() {
  console.log(`Usage: float2hex [options] <value>

Convert float to IEEE 754 hex or hex back to float.

Options:
  -d, --double    Use 64-bit double precision (default)
  -f, --float     Use 32-bit single precision
  -r, --reverse   Convert hex to float
  -h, --help      Show this help

Examples:
  float2hex 3.14            → 40091eb851eb851f
  float2hex -f 3.14         → 4048f5c3
  float2hex -r 40091eb851eb851f  → 3.14
  float2hex -f -r 4048f5c3      → 3.140000104904175
  echo "1.5\\n2.5" | float2hex  → (converts each line)`);
  process.exit(0);
}

let double = true;
let reverse = false;
const values = [];

for (const a of args) {
  if (a === '-h' || a === '--help') usage();
  else if (a === '-d' || a === '--double') double = true;
  else if (a === '-f' || a === '--float') double = false;
  else if (a === '-r' || a === '--reverse') reverse = true;
  else values.push(a);
}

function floatToHex(val, isDouble) {
  const num = parseFloat(val);
  if (isNaN(num)) { console.error(`Error: invalid number "${val}"`); process.exit(1); }
  const buf = Buffer.alloc(isDouble ? 8 : 4);
  if (isDouble) buf.writeDoubleBE(num, 0);
  else buf.writeFloatBE(num, 0);
  return buf.toString('hex');
}

function hexToFloat(hex, isDouble) {
  hex = hex.replace(/^0x/i, '');
  const expected = isDouble ? 16 : 8;
  if (hex.length !== expected) {
    console.error(`Error: expected ${expected} hex chars, got ${hex.length}`);
    process.exit(1);
  }
  const buf = Buffer.from(hex, 'hex');
  return isDouble ? buf.readDoubleBE(0) : buf.readFloatBE(0);
}

function convert(val) {
  return reverse ? hexToFloat(val.trim(), double) : floatToHex(val.trim(), double);
}

if (values.length > 0) {
  for (const v of values) console.log(convert(v));
} else if (!process.stdin.isTTY) {
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', c => data += c);
  process.stdin.on('end', () => {
    const lines = data.split('\n').filter(l => l.trim());
    for (const l of lines) console.log(convert(l));
  });
} else {
  usage();
}
