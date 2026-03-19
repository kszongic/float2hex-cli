# float2hex-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/float2hex-cli)](https://www.npmjs.com/package/@kszongic/float2hex-cli)
[![license](https://img.shields.io/npm/l/@kszongic/float2hex-cli)](./LICENSE)

Convert floating-point numbers to their IEEE 754 hex representation and back. Zero dependencies.

## Install

```bash
npm install -g @kszongic/float2hex-cli
```

## Usage

```bash
# Float to hex (64-bit double, default)
float2hex 3.14
# 40091eb851eb851f

# Float to hex (32-bit single)
float2hex -f 3.14
# 4048f5c3

# Hex back to float
float2hex -r 40091eb851eb851f
# 3.14

# 32-bit hex to float
float2hex -f -r 4048f5c3
# 3.140000104904175

# Pipe from stdin
echo "1.5" | float2hex
# 3ff8000000000000
```

## Options

| Flag | Description |
|------|-------------|
| `-d, --double` | Use 64-bit double precision (default) |
| `-f, --float` | Use 32-bit single precision |
| `-r, --reverse` | Convert hex to float |
| `-h, --help` | Show help |

## Use Cases

- Debugging IEEE 754 floating-point representation
- Low-level data inspection
- Network protocol analysis
- Embedded systems development

## License

MIT
