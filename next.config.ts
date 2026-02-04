// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/Build/BuildGemini.framework.br",
        headers: [
          { key: "Content-Type", value: "application/javascript" },
          { key: "Content-Encoding", value: "br" },
          { key: "Vary", value: "Accept-Encoding" },
        ],
      },
      {
        source: "/Build/BuildGemini.wasmfile.br",
        headers: [
          { key: "Content-Type", value: "application/wasm" },
          { key: "Content-Encoding", value: "br" },
          { key: "Vary", value: "Accept-Encoding" },
        ],
      },
      {
        source: "/Build/BuildGemini.data.br",
        headers: [
          { key: "Content-Type", value: "application/octet-stream" },
          { key: "Content-Encoding", value: "br" },
          { key: "Vary", value: "Accept-Encoding" },
        ],
      },
    ];
  },
};
