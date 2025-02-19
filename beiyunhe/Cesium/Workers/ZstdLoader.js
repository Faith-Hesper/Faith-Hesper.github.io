define(["./zstd_wasm"],(function(t){"use strict";let e;class s{static initLoader(){return e||(e=t.init()),e}static async getDecompress(){return await s.initLoader(),t.decompress}}return s}));
