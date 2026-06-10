import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { Buffer } from "node:buffer";

const sizes = [16, 48, 128];

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])));
  return Buffer.concat([length, typeBytes, data, crc]);
}

function drawIcon(size) {
  const data = Buffer.alloc((size * 4 + 1) * size);
  const radius = size * 0.22;
  const center = size / 2;

  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1);
    data[row] = 0;

    for (let x = 0; x < size; x += 1) {
      const offset = row + 1 + x * 4;
      const dx = x - center;
      const dy = y - center;
      const inCircle = Math.sqrt(dx * dx + dy * dy) < radius;
      const inStroke = Math.abs(y - (size - x * 0.55 - size * 0.16)) < size * 0.05;
      const inBase = y > size * 0.73 && y < size * 0.82 && x > size * 0.24 && x < size * 0.76;

      const color = inCircle || inStroke || inBase ? [52, 211, 153] : [17, 24, 39];
      data[offset] = color[0];
      data[offset + 1] = color[1];
      data[offset + 2] = color[2];
      data[offset + 3] = 255;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(data)),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

mkdirSync("public/icons", { recursive: true });
for (const size of sizes) {
  writeFileSync(`public/icons/icon-${size}.png`, drawIcon(size));
}
