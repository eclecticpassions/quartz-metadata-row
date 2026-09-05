import { createRequire } from 'module';

const require$1 = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require$1 !== "undefined" ? require$1 : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a2, b) => (typeof require$1 !== "undefined" ? require$1 : a2)[b]
}) : x2)(function(x2) {
  if (typeof require$1 !== "undefined") return require$1.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/reading-time/lib/reading-time.js
var require_reading_time = __commonJS({
  "node_modules/reading-time/lib/reading-time.js"(exports, module) {
    function codeIsInRanges(number, arrayOfRanges) {
      return arrayOfRanges.some(
        ([lowerBound, upperBound]) => lowerBound <= number && number <= upperBound
      );
    }
    function isCJK(c2) {
      if ("string" !== typeof c2) {
        return false;
      }
      const charCode = c2.charCodeAt(0);
      return codeIsInRanges(
        charCode,
        [
          // Hiragana (Katakana not included on purpose,
          // context: https://github.com/ngryman/reading-time/pull/35#issuecomment-853364526)
          // If you think Katakana should be included and have solid reasons, improvement is welcomed
          [12352, 12447],
          // CJK Unified ideographs
          [19968, 40959],
          // Hangul
          [44032, 55203],
          // CJK extensions
          [131072, 191456]
        ]
      );
    }
    function isAnsiWordBound(c2) {
      return " \n\r	".includes(c2);
    }
    function isPunctuation(c2) {
      if ("string" !== typeof c2) {
        return false;
      }
      const charCode = c2.charCodeAt(0);
      return codeIsInRanges(
        charCode,
        [
          [33, 47],
          [58, 64],
          [91, 96],
          [123, 126],
          // CJK Symbols and Punctuation
          [12288, 12351],
          // Full-width ASCII punctuation variants
          [65280, 65519]
        ]
      );
    }
    function readingTime2(text, options = {}) {
      let words = 0, start = 0, end = text.length - 1;
      const wordsPerMinute = options.wordsPerMinute || 200;
      const isWordBound = options.wordBound || isAnsiWordBound;
      while (isWordBound(text[start])) start++;
      while (isWordBound(text[end])) end--;
      const normalizedText = `${text}
`;
      for (let i2 = start; i2 <= end; i2++) {
        if (isCJK(normalizedText[i2]) || !isWordBound(normalizedText[i2]) && (isWordBound(normalizedText[i2 + 1]) || isCJK(normalizedText[i2 + 1]))) {
          words++;
        }
        if (isCJK(normalizedText[i2])) {
          while (i2 <= end && (isPunctuation(normalizedText[i2 + 1]) || isWordBound(normalizedText[i2 + 1]))) {
            i2++;
          }
        }
      }
      const minutes = words / wordsPerMinute;
      const time = Math.round(minutes * 60 * 1e3);
      const displayed = Math.ceil(minutes.toFixed(2));
      return {
        text: displayed + " min read",
        minutes,
        time,
        words
      };
    }
    module.exports = readingTime2;
  }
});

// node_modules/reading-time/lib/stream.js
var require_stream = __commonJS({
  "node_modules/reading-time/lib/stream.js"(exports, module) {
    var readingTime2 = require_reading_time();
    var Transform = __require("stream").Transform;
    var util = __require("util");
    function ReadingTimeStream(options) {
      if (!(this instanceof ReadingTimeStream)) {
        return new ReadingTimeStream(options);
      }
      Transform.call(this, { objectMode: true });
      this.options = options || {};
      this.stats = {
        minutes: 0,
        time: 0,
        words: 0
      };
    }
    util.inherits(ReadingTimeStream, Transform);
    ReadingTimeStream.prototype._transform = function(chunk, encoding, callback) {
      const stats = readingTime2(chunk.toString(encoding), this.options);
      this.stats.minutes += stats.minutes;
      this.stats.time += stats.time;
      this.stats.words += stats.words;
      callback();
    };
    ReadingTimeStream.prototype._flush = function(callback) {
      this.stats.text = Math.ceil(this.stats.minutes.toFixed(2)) + " min read";
      this.push(this.stats);
      callback();
    };
    module.exports = ReadingTimeStream;
  }
});

// node_modules/reading-time/index.js
var require_reading_time2 = __commonJS({
  "node_modules/reading-time/index.js"(exports, module) {
    module.exports.default = module.exports = require_reading_time();
    module.exports.readingTimeStream = require_stream();
  }
});

// node_modules/@quartz-community/utils/dist/path.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function trimSuffix(s2, suffix) {
  if (endsWith(s2, suffix)) {
    s2 = s2.slice(0, -suffix.length);
  }
  return s2;
}
function stripSlashes(s2, onlyStripPrefix) {
  if (s2.startsWith("/")) {
    s2 = s2.substring(1);
  }
  if (!onlyStripPrefix && s2.endsWith("/")) {
    s2 = s2.slice(0, -1);
  }
  return s2;
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x2) => x2 !== "").slice(0, -1).map((_2) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}

// node_modules/preact/dist/preact.mjs
var n;
var l;
var u;
var v = [];
function _(l2, u2, t2) {
  var i2, o2, r2, e2 = {};
  for (r2 in u2) "key" == r2 ? i2 = u2[r2] : "ref" == r2 ? o2 = u2[r2] : e2[r2] = u2[r2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (r2 in l2.defaultProps) void 0 === e2[r2] && (e2[r2] = l2.defaultProps[r2]);
  return m(l2, e2, i2, o2, null);
}
function m(n2, t2, i2, o2, r2) {
  var e2 = { type: n2, props: t2, key: i2, ref: o2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == r2 ? ++u : r2, __i: -1, __u: 0 };
  return null != l.vnode && l.vnode(e2), e2;
}
n = v.slice, l = { __e: function(n2, l2, u2, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u = 0, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// src/index.ts
var import_reading_time = __toESM(require_reading_time2());
var sameDay = (a2, b) => a2.getFullYear() === b.getFullYear() && a2.getMonth() === b.getMonth() && a2.getDate() === b.getDate();
var MetadataRowImpl = (props) => {
  const { fileData } = props;
  const frontmatter = fileData.frontmatter || {};
  const metaItems = [];
  function myFormatDate(d2) {
    const y2 = d2.getFullYear();
    const m2 = String(d2.getMonth() + 1).padStart(2, "0");
    const day = String(d2.getDate()).padStart(2, "0");
    return `${y2}-${m2}-${day}`;
  }
  const createdDate = fileData.dates?.created;
  if (createdDate) {
    const created = new Date(createdDate);
    const dateStr = myFormatDate(created);
    const modifiedDate = fileData.dates?.modified;
    if (modifiedDate) {
      const modified = new Date(modifiedDate);
      if (!sameDay(modified, created)) {
        const modifiedStr = myFormatDate(modified);
        metaItems.push(_("span", { class: "meta-item" }, `${dateStr} (modified: ${modifiedStr})`));
      } else {
        metaItems.push(_("span", { class: "meta-item" }, dateStr));
      }
    } else {
      metaItems.push(_("span", { class: "meta-item" }, dateStr));
    }
  }
  if (fileData.text) {
    const { minutes } = (0, import_reading_time.default)(fileData.text);
    const wordCount = fileData.text.split(/\s+/).filter(Boolean).length;
    metaItems.push(
      _("span", { class: "meta-item" }, `${wordCount} words (${Math.ceil(minutes)} mins)`)
    );
  }
  if (frontmatter.tags) {
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [frontmatter.tags];
    const tagLinks = tags.map((tag) => {
      const tagHref = resolveRelative(fileData.slug, `tags/${tag}`);
      return _(
        "a",
        {
          class: "internal tag-link",
          href: tagHref
        },
        `${tag}`
      );
    });
    metaItems.push(_("span", { class: "meta-item tags" }, ...tagLinks));
  }
  if (frontmatter.status) {
    const statusValue = Array.isArray(frontmatter.status) ? frontmatter.status : String(frontmatter.status);
    metaItems.push(
      _("span", { class: "meta-item status" }, [
        _("span", { class: "meta-item" }, statusValue),
        _("span", { class: "status-tooltip" }, [
          "This is the ",
          _("a", { href: "/about/#note-status" }, "status label")
        ])
      ])
    );
  }
  return _("div", { class: "metadata-row" }, ...metaItems);
};
MetadataRowImpl.css = `  
.metadata-row {  
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: start;
}  

.meta-item {  
  display: inline-flex;  
  align-items: center;  
}  

.meta-item.tags {
gap: 0.3rem;
}

.meta-item.status {
  position: relative;
  cursor: help;
}

.status-tooltip {
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 160ms ease, transform 160ms ease, visibility 0s linear 160ms;
  position: absolute;
  left: 0;
  top: 100%;
  box-shadow: 2px 3px 5px #000;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  white-space: nowrap;
  pointer-events: auto;
}

.meta-item.status:hover .status-tooltip,
.meta-item.status:focus-within .status-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity 160ms ease, transform 160ms ease, visibility 0s;
}

.meta-item.status::after {
  content: "";
  position: absolute;
  top: 100%;
  left: -10%;
  height: 50%;
  width: 120%;
}
`;
var MetadataRow = (() => MetadataRowImpl);
var src_default = MetadataRow;
/*! Bundled license information:

reading-time/lib/reading-time.js:
reading-time/lib/stream.js:
  (*!
   * reading-time
   * Copyright (c) Nicolas Gryman <ngryman@gmail.com>
   * MIT Licensed
   *)
*/

export { MetadataRow, src_default as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map