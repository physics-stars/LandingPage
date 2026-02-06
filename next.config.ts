// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/Build/BuildProd.framework.br",
        headers: [
          { key: "Content-Type", value: "application/javascript" },
          { key: "Content-Encoding", value: "br" },
          { key: "Vary", value: "Accept-Encoding" },
        ],
      },
      {
        source: "/Build/BuildProd.wasmfile.br",
        headers: [
          { key: "Content-Type", value: "application/wasm" },
          { key: "Content-Encoding", value: "br" },
          { key: "Vary", value: "Accept-Encoding" },
        ],
      },
      {
        source: "/Build/BuildProd.data.br",
        headers: [
          { key: "Content-Type", value: "application/octet-stream" },
          { key: "Content-Encoding", value: "br" },
          { key: "Vary", value: "Accept-Encoding" },
        ],
      },
    ];
  },
};
