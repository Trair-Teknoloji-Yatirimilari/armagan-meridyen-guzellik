import { createStart } from "@tanstack/react-start";

/**
 * TanStack Start örneği.
 *
 * Site tamamen statik servis edildiği için çalışma anında sunucu middleware'i
 * yok; bu dosya yalnızca derleme/prerender aşamasında Start'ın ihtiyaç duyduğu
 * giriş noktasını sağlıyor. Sunucu fonksiyonu (serverFn) kullanılmıyor.
 */
export const startInstance = createStart(() => ({}));
