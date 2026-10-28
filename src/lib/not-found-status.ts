import { createIsomorphicFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";

/**
 * 404 sayfası sunucuda gerçekten 404 ile dönsün diye yanıt kodunu ayarlar.
 * Tarayıcı tarafında (istemci içi gezinmede) hiçbir şey yapmaz.
 */
export const markNotFoundResponse = createIsomorphicFn()
  .client(() => {})
  .server(() => {
    setResponseStatus(404);
  });
