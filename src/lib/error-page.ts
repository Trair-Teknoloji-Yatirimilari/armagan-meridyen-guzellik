/**
 * Sunucu tarafında React hiç çalışamadığında basılan yedek sayfa.
 * Hiçbir varlığa bağımlı olmaması gerektiği için stil satır içinde.
 */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <title>Sayfa şu an açılamıyor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.6 ui-sans-serif, system-ui, -apple-system, sans-serif; background: #f7f5f1; color: #2b2724; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .kutu { max-width: 30rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-family: ui-serif, Georgia, serif; font-size: 1.4rem; font-weight: 400; margin: 0 0 0.75rem; }
      p { color: #6b635c; margin: 0 0 1.5rem; }
      .islemler { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.6rem 1.2rem; border-radius: 999px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .birincil { background: #6b5e52; color: #fff; }
      .ikincil { background: transparent; color: #6b5e52; border-color: #cfc7bd; }
    </style>
  </head>
  <body>
    <div class="kutu">
      <h1>Sayfa şu an açılamıyor</h1>
      <p>Geçici bir aksaklık oldu. Birkaç saniye sonra yenilemeyi deneyebilir ya da ana sayfaya dönebilirsiniz.</p>
      <div class="islemler">
        <button class="birincil" onclick="location.reload()">Yeniden dene</button>
        <a class="ikincil" href="/">Ana sayfaya dön</a>
      </div>
    </div>
  </body>
</html>`;
}
