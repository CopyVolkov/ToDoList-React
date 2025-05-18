export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    if (options.body) {
      options.body = JSON.stringify(options.body);
    } else {
      delete options.body;
    }

    console.log("Ejecutando petición a:", endpoint);
    console.log("Opciones:", options);

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject({
          err: true,
          status: "408",
          statusText: "Tiempo de espera agotado",
        });
      }, 10000); // 10 segundos de timeout

      fetch(endpoint, options)
        .then((res) => {
          clearTimeout(timeoutId); // Cancelamos el timeout si la respuesta llega

          if (!res.ok) {
            throw {
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            };
          }

          // ✅ Verifica si la respuesta tiene contenido antes de parsearla como JSON
          return res.text().then((text) => {
            return text ? JSON.parse(text) : null;
          });
        })
        .then(resolve)
        .catch(reject);
    });
  };

  return {
    get: (url, options = {}) => customFetch(url, options),
    post: (url, options = {}) => {
      options.method = "POST";
      return customFetch(url, options);
    },
    put: (url, options = {}) => {
      options.method = "PUT";
      return customFetch(url, options);
    },
    del: (url, options = {}) => {
      options.method = "DELETE";
      return customFetch(url, options);
    },
  };
};
export default helpHttp;
