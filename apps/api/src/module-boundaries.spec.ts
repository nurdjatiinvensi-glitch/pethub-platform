import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

// Menjaga aturan modular monolith secara otomatis:
//   1. Sebuah modul hanya boleh mengakses tabel miliknya sendiri.
//   2. Modul donor dan payment tidak boleh mengimpor modul order.
//   3. Catalog tidak bergantung pada FeedCare; order boleh membaca Item katalog.
// Jika test ini gagal, berarti ada modul yang melanggar batas. Perbaiki kodenya,
// jangan menghapus aturannya.

const SRC = join(process.cwd(), 'src');

// Pemilik tabel (nama model ORM) untuk tiap modul.
const OWNER: Record<string, string> = {
  Donor: 'feedcare/donor',
  FeedCareOrder: 'feedcare/order',
  Payment: 'feedcare/payment',
  Category: 'catalog',
  Subcategory: 'catalog',
  Item: 'catalog',
  ItemSpecification: 'catalog',
  AuditLog: 'common/logging',
};

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return listSourceFiles(full);
    const isProdCode =
      name.endsWith('.ts') &&
      !name.endsWith('.spec.ts') &&
      !name.endsWith('.d.ts') &&
      !full.includes(`${sep}prisma${sep}`);
    return isProdCode ? [full] : [];
  });
}

const files = listSourceFiles(SRC).map((full) => ({
  path: relative(SRC, full).split(sep).join('/'),
  code: readFileSync(full, 'utf8'),
}));

function belongsTo(path: string, owner: string) {
  return path === owner || path.startsWith(`${owner}/`);
}

describe('module boundaries', () => {
  it('finds source files to check', () => {
    expect(files.length).toBeGreaterThan(10);
  });

  it('each module only accesses its own tables', () => {
    const violations: string[] = [];

    for (const file of files) {
      for (const match of file.code.matchAll(/orm\.public\.(\w+)/g)) {
        const model = match[1];
        const owner = OWNER[model];

        if (owner && !belongsTo(file.path, owner)) {
          violations.push(`${file.path} mengakses tabel ${model} milik ${owner}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('leaf modules (donor, payment) do not import the order module', () => {
    const violations = files
      .filter((f) =>
        ['feedcare/donor', 'feedcare/payment'].some((m) =>
          belongsTo(f.path, m),
        ),
      )
      .filter((f) => /from\s+['"][^'"]*\/order\//.test(f.code))
      .map((f) => `${f.path} mengimpor modul order`);

    expect(violations).toEqual([]);
  });

  it('only FeedCare order may import catalog; catalog never imports FeedCare', () => {
    const violations = files.flatMap((f) => {
      const issues: string[] = [];
      if (belongsTo(f.path, 'catalog') && /from\s+['"][^'"]*\/feedcare\//.test(f.code)) {
        issues.push(`${f.path} (catalog) mengimpor feedcare`);
      }
      if (
        belongsTo(f.path, 'feedcare') &&
        !belongsTo(f.path, 'feedcare/order') &&
        /from\s+['"][^'"]*\/catalog\//.test(f.code)
      ) {
        issues.push(`${f.path} (feedcare selain order) mengimpor catalog`);
      }
      return issues;
    });

    expect(violations).toEqual([]);
  });
});
