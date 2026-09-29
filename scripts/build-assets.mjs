// Builds the SVG cards used by README.md, in light and dark variants.
// Run: node scripts/build-assets.mjs   (no dependencies)
// Facts match rohithreddykota.com. Keep copy free of em dashes and semicolons.
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../assets/', import.meta.url);
const avatar = readFileSync(new URL('avatar.jpg', dir)).toString('base64');

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";

const T = {
  dark: { bg: '#0d1117', surface: '#161b22', grid: '#ffffff', gridOp: 0.035, ink: '#e6edf3', mute: '#8b949e', faint: '#6e7681', border: '#30363d', accent: '#ff9f43', accentSoft: 'rgba(255,159,67,0.12)', chip: '#21262d', glow: 0.2 },
  light: { bg: '#ffffff', surface: '#f6f8fa', grid: '#1f2328', gridOp: 0.045, ink: '#1f2328', mute: '#59636e', faint: '#6e7781', border: '#d0d7de', accent: '#c2410c', accentSoft: 'rgba(194,65,12,0.08)', chip: '#eef1f4', glow: 0.1 },
};
// The console always stays dark, like a real terminal.
const C = { bg: '#0e1117', border: '#262c35', text: '#d7dbe0', mute: '#7c8591', faint: '#5b636e', accent: '#ffb454' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const textW = (s, px, mono = false) => [...s].length * px * (mono ? 0.6 : 0.56);

const frame = (w, h, t, id, body, { title, desc, glow = true, style = '' } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="${id}-t ${id}-d">
  <title id="${id}-t">${esc(title)}</title>
  <desc id="${id}-d">${esc(desc)}</desc>
  <style>
    ${style}
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
  </style>
  <defs>
    <pattern id="${id}-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${t.grid}" stroke-opacity="${t.gridOp}"/></pattern>
    <radialGradient id="${id}-glow" cx="0.95" cy="0" r="0.75"><stop offset="0" stop-color="${t.accent}" stop-opacity="${t.glow}"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>
    <clipPath id="${id}-clip"><rect width="${w}" height="${h}" rx="16"/></clipPath>
  </defs>
  <g clip-path="url(#${id}-clip)">
    <rect width="${w}" height="${h}" fill="${t.bg}"/>
    <rect width="${w}" height="${h}" fill="url(#${id}-grid)"/>
    ${glow ? `<rect width="${w}" height="${h}" fill="url(#${id}-glow)"/>` : ''}
  </g>
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="16" fill="none" stroke="${t.border}"/>
  ${body}
</svg>
`;

// ---------- 1. Hero ----------
function hero(t, name) {
  const query = 'SELECT metric, value FROM rohith.profile;';
  const rows = [
    ['enterprise_customers', '50+', 'taken live on Rill'],
    ['customer_pocs', '150+', 'proofs of concept'],
    ['data_managed', '2+ PB', 'ClickHouse, Druid, DuckDB'],
    ['olap_clusters', '30+', 'sharded, replicated, on GKE'],
    ['storage_cpu_saved', '30–40%', 'schema and compaction tuning'],
    ['tb_scan_time', '<30s', 'TB-scale scans after tuning'],
  ];
  const qx = 50, qy = 84;
  const qw = textW(query, 14.5, true) + 4;
  // Motion is decorative only: every frame, including the first, shows all content.
  const style = `
    .caret { animation: blink 1.1s steps(1) infinite; }
    @keyframes blink { 50% { opacity: 0; } }
    .live { animation: pulse 2.4s ease-in-out infinite; }
    @keyframes pulse { 50% { opacity: 0.35; } }`;
  const body = `
  <defs><clipPath id="av"><rect x="56" y="64" width="112" height="112" rx="26"/></clipPath></defs>
  <g>
    <image href="data:image/jpeg;base64,${avatar}" x="56" y="64" width="112" height="112" clip-path="url(#av)" preserveAspectRatio="xMidYMid slice"/>
    <rect x="56.5" y="64.5" width="111" height="111" rx="26" fill="none" stroke="${t.border}"/>
    <text x="196" y="96" font-family="${MONO}" font-size="14" letter-spacing="2" fill="${t.accent}">FORWARD DEPLOYED ENGINEER · RILL DATA</text>
    <text x="194" y="152" font-family="${SANS}" font-size="50" font-weight="700" letter-spacing="-1.2" fill="${t.ink}">Rohith Reddy Kota</text>
    <text x="196" y="182" font-family="${SANS}" font-size="15" fill="${t.mute}">Boston, MA  ·  9+ years in data platforms and infrastructure</text>
  </g>
  <g>
    <text font-family="${SANS}" font-size="21" fill="${t.ink}">
      <tspan x="58" y="246">I take enterprise customers from first call to</tspan>
      <tspan x="58" y="276">production analytics, and I engineer every layer</tspan>
      <tspan x="58" y="306">in between, from the data model to the cluster.</tspan>
    </text>
    <text x="58" y="356" font-family="${MONO}" font-size="14" fill="${t.faint}">rohithreddykota.com</text>
  </g>

  <g transform="translate(700 40)">
    <rect width="524" height="340" rx="14" fill="${C.bg}" stroke="${name === 'dark' ? t.border : '#1f2328'}"/>
    <circle cx="24" cy="24" r="6" fill="#ff5f57"/><circle cx="44" cy="24" r="6" fill="#febc2e"/><circle cx="64" cy="24" r="6" fill="#28c840"/>
    <text x="86" y="29" font-family="${MONO}" font-size="12.5" fill="${C.mute}">clickhouse-client · rohith@boston</text>
    <circle class="live" cx="452" cy="24" r="4" fill="#28c840"/>
    <text x="462" y="28.5" font-family="${MONO}" font-size="11" fill="${C.mute}">live</text>
    <line x1="0" y1="46" x2="524" y2="46" stroke="${C.border}"/>
    <text x="22" y="${qy}" font-family="${MONO}" font-size="14.5" fill="${C.accent}">:)</text>
    <text x="${qx}" y="${qy}" font-family="${MONO}" font-size="14.5" fill="${C.text}">${esc(query)}</text>
    <rect class="caret" x="${qx + qw}" y="${qy - 13}" width="8" height="16" fill="${C.accent}"/>
    <text x="22" y="118" font-family="${MONO}" font-size="12" fill="${C.faint}">metric</text>
    <text x="224" y="118" font-family="${MONO}" font-size="12" fill="${C.faint}">value</text>
    <text x="304" y="118" font-family="${MONO}" font-size="12" fill="${C.faint}">note</text>
    <line x1="22" y1="128" x2="502" y2="128" stroke="${C.border}"/>
    ${rows
      .map(
        ([k, v, n], i) => `<g>
      <text x="22" y="${154 + i * 28}" font-family="${MONO}" font-size="13.5" fill="${C.mute}">${k}</text>
      <text x="224" y="${154 + i * 28}" font-family="${MONO}" font-size="13.5" font-weight="700" fill="${C.accent}">${esc(v)}</text>
      <text x="304" y="${154 + i * 28}" font-family="${SANS}" font-size="12" fill="${C.mute}">${esc(n)}</text>
    </g>`,
      )
      .join('\n    ')}
    <g><text x="22" y="322" font-family="${MONO}" font-size="11.5" fill="${C.faint}">${rows.length} rows in set. Elapsed: 0.004 sec. Processed 2.00 PB.</text></g>
  </g>`;
  return frame(1280, 420, t, 'hero', body, {
    title: 'Rohith Reddy Kota, Forward Deployed Engineer at Rill Data',
    desc: '50+ enterprise customers taken live, 150+ proofs of concept, 2+ PB of ClickHouse, Druid, and DuckDB on Kubernetes, 30+ OLAP clusters, 30 to 40 percent less storage and CPU, and TB-scale scans in under 30 seconds.',
    style,
  });
}

// ---------- 2. Capabilities ----------
function capabilities(t) {
  const cards = [
    ['PRE-SALES', 'Proofs of concept', '150+', ['Discovery, solution design, and a', 'working deployment with Sales and GTM']],
    ['CUSTOMER ENGINEERING', 'Enterprise deployments', '50+', ['SSO, migrations, and go-live through', 'GitOps clusters and BYOC installs']],
    ['DATABASES', 'Storage & query performance', '<30s', ['TB-scale scans after sort keys,', 'projections, codecs, and compaction']],
    ['INFRASTRUCTURE', 'Petabyte scale on Kubernetes', '2+ PB', ['ClickHouse, Druid, and DuckDB on GKE', 'with Helm, Terraform, and Go operators']],
    ['PRODUCT & SUCCESS', 'Roadmap and ownership', '50+', ['Customer requirements turned into', 'shipped features, and accounts owned']],
    ['AI TOOLING', 'Agents that ship faster', 'MCP', ['MCP servers, agent skills, and an', 'AI on-call agent for every deployment']],
  ];
  const W = 1280, pad = 40, gap = 20, cols = 3, cw = (W - pad * 2 - gap * (cols - 1)) / cols, ch = 176;
  const body = cards
    .map(([tag, title, stat, lines], i) => {
      const x = pad + (i % cols) * (cw + gap), y = 72 + Math.floor(i / cols) * (ch + gap);
      return `<g transform="translate(${x} ${y})">
    <rect width="${cw}" height="${ch}" rx="12" fill="${t.surface}" stroke="${t.border}"/>
    <rect x="0" y="0" width="4" height="${ch}" rx="2" fill="${t.accent}" opacity="0.9"/>
    <text x="24" y="36" font-family="${MONO}" font-size="11.5" letter-spacing="1.6" fill="${t.accent}">${esc(tag)}</text>
    <text x="${cw - 24}" y="44" text-anchor="end" font-family="${MONO}" font-size="30" font-weight="700" fill="${t.ink}">${esc(stat)}</text>
    <text x="24" y="86" font-family="${SANS}" font-size="20" font-weight="650" fill="${t.ink}">${esc(title)}</text>
    <text font-family="${SANS}" font-size="14.5" fill="${t.mute}"><tspan x="24" y="120">${esc(lines[0])}</tspan><tspan x="24" y="143">${esc(lines[1])}</tspan></text>
  </g>`;
    })
    .join('\n  ');
  const head = `<text x="${pad}" y="44" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.faint}">WHAT I DO</text>`;
  return frame(W, 72 + ch * 2 + gap + 40, t, 'cap', head + '\n  ' + body, {
    title: 'What Rohith does',
    desc: cards.map(([, title, stat, l]) => `${title}: ${stat}. ${l.join(' ')}`).join(' '),
    glow: false,
  });
}

// ---------- 3. Case-study cards ----------
const studies = [
  { id: 'clickhouse-k8s', tag: 'PLATFORM', title: 'Self-hosted ClickHouse on Kubernetes', stat: '14', label: 'production ClickHouse clusters', flow: ['GitOps', 'Helm + Terraform', 'Operator', 'ClickHouse'] },
  { id: 'mcp-optimization', tag: 'AI', title: 'AI-assisted ClickHouse optimization', stat: 'Multi-TB', label: 'columns found in one audit pass', flow: ['System tables', 'MCP server', 'Claude Code', 'Plan'] },
  { id: 'bidstream', tag: 'STREAMING', title: 'Real-time AdTech bidstream pipelines', stat: 'GBs/hr', label: 'into real-time dashboards', flow: ['Scala intake', 'Kafka', 'Beam', 'Druid'] },
  { id: 'hll-sketches', tag: 'WRITING', title: 'BigQuery HLL sketches to ClickHouse', stat: 'Byte-exact', label: 'match with ClickHouse’s serializer', flow: ['ZetaSketch', 'Registers', 'uniqCombined64'] },
];
function study(t, s) {
  const W = 620, H = 236;
  let x = 28;
  const chips = s.flow
    .map((f, i) => {
      const w = textW(f, 12, true) + 20;
      const last = i === s.flow.length - 1;
      const out = `<g transform="translate(${x} 170)"><rect width="${w}" height="30" rx="7" fill="${last ? t.accentSoft : t.chip}" stroke="${last ? t.accent : t.border}" stroke-opacity="${last ? 0.6 : 1}"/><text x="${w / 2}" y="19.5" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${last ? t.ink : t.mute}">${esc(f)}</text></g>`;
      x += w + (last ? 0 : 26);
      return out + (last ? '' : `<text x="${x - 16}" y="190" font-family="${MONO}" font-size="13" fill="${t.faint}">→</text>`);
    })
    .join('');
  const body = `
  <text x="28" y="40" font-family="${MONO}" font-size="11.5" letter-spacing="1.6" fill="${t.accent}">${esc(s.tag)}</text>
  <text x="${W - 28}" y="40" text-anchor="end" font-family="${SANS}" font-size="13" fill="${t.faint}">Read ↗</text>
  <text x="28" y="78" font-family="${SANS}" font-size="22" font-weight="650" fill="${t.ink}">${esc(s.title)}</text>
  <rect x="28" y="100" width="3" height="42" rx="1.5" fill="${t.accent}"/>
  <text x="42" y="130" font-family="${MONO}" font-size="28" font-weight="700" fill="${t.ink}">${esc(s.stat)}</text>
  <text x="${42 + textW(s.stat, 28, true) + 14}" y="129" font-family="${SANS}" font-size="14" fill="${t.mute}">${esc(s.label)}</text>
  ${chips}`;
  return frame(W, H, t, `cs-${s.id}`, body, { title: s.title, desc: `${s.stat} ${s.label}. ${s.flow.join(' to ')}.`, glow: false });
}

// ---------- 4. Stack ----------
function stack(t) {
  const groups = [
    ['Databases & OLAP', ['ClickHouse', 'Apache Druid', 'DuckDB'], ['Snowflake', 'Postgres', 'Iceberg', 'Delta Lake', 'MotherDuck']],
    ['Streaming & batch', ['Kafka', 'Apache Beam', 'Dataflow'], ['Flink', 'Spark', 'Airflow', 'dbt']],
    ['Infrastructure', ['Kubernetes', 'Helm', 'Terraform'], ['Go operators', 'Docker', 'GitOps', 'GitHub Actions']],
    ['Languages & APIs', ['Go', 'Python', 'SQL'], ['Scala', 'FastAPI', 'gRPC', 'REST']],
    ['Cloud & identity', ['Google Cloud', 'AWS'], ['SSO', 'SAML', 'OIDC', 'IAM', 'Row-level security']],
    ['AI tooling', ['MCP', 'Claude Code'], ['Cursor', 'Codex', 'LLM agents', 'Structured outputs']],
  ];
  const W = 1280, rowH = 46, top = 76;
  const body = groups
    .map(([label, core, also], r) => {
      const y = top + r * rowH;
      let x = 250;
      const chips = [...core.map((c) => [c, true]), ...also.map((c) => [c, false])]
        .map(([c, isCore]) => {
          const w = textW(c, 13, false) + 26;
          const g = `<g transform="translate(${x} ${y - 21})"><rect width="${w}" height="30" rx="15" fill="${isCore ? t.accentSoft : t.chip}" stroke="${isCore ? t.accent : t.border}" stroke-opacity="${isCore ? 0.55 : 1}"/><text x="${w / 2}" y="19.5" text-anchor="middle" font-family="${SANS}" font-size="13" ${isCore ? 'font-weight="600"' : ''} fill="${isCore ? t.ink : t.mute}">${esc(c)}</text></g>`;
          x += w + 8;
          return g;
        })
        .join('');
      return `<text x="40" y="${y}" font-family="${MONO}" font-size="12.5" letter-spacing="0.5" fill="${t.faint}">${esc(label)}</text>${chips}`;
    })
    .join('\n  ');
  const head = `<text x="40" y="44" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.faint}">STACK</text>
  <text x="${W - 40}" y="44" text-anchor="end" font-family="${SANS}" font-size="13" fill="${t.faint}">Highlighted: in production every day</text>`;
  return frame(W, top + groups.length * rowH + 8, t, 'stack', head + '\n  ' + body, {
    title: 'Stack',
    desc: groups.map(([l, c, a]) => `${l}: ${[...c, ...a].join(', ')}`).join('. '),
    glow: false,
  });
}

for (const [name, t] of Object.entries(T)) {
  writeFileSync(new URL(`hero-${name}.svg`, dir), hero(t, name));
  writeFileSync(new URL(`capabilities-${name}.svg`, dir), capabilities(t));
  writeFileSync(new URL(`stack-${name}.svg`, dir), stack(t));
  for (const s of studies) writeFileSync(new URL(`study-${s.id}-${name}.svg`, dir), study(t, s));
}
console.log('Built', Object.keys(T).length * (3 + studies.length), 'SVGs');
