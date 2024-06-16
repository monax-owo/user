// ==UserScript==
// @name       boom
// @namespace  a
// @version    0.0.0
// @author     monkey
// @icon       https://www.google.com/s2/favicons?sz=64&domain=line.me
// @match      https://linevoom.line.me/*
// @grant      GM_addStyle
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(' *,:before,:after{box-sizing:border-box;background-repeat:no-repeat}:before,:after{text-decoration:inherit;vertical-align:inherit}:where(:root){cursor:default;line-height:1.5;overflow-wrap:break-word;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:100%}:where(body){margin:0}:where(h1){font-size:2em;margin:.67em 0}:where(dl,ol,ul) :where(dl,ol,ul){margin:0}:where(hr){color:inherit;height:0}:where(nav) :where(ol,ul){list-style-type:none;padding:0}:where(nav li):before{content:"\u200B";float:left}:where(pre){font-family:monospace,monospace;font-size:1em;overflow:auto}:where(abbr[title]){text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}:where(b,strong){font-weight:bolder}:where(code,kbd,samp){font-family:monospace,monospace;font-size:1em}:where(small){font-size:80%}:where(audio,canvas,iframe,img,svg,video){vertical-align:middle}:where(iframe){border-style:none}:where(svg:not([fill])){fill:currentColor}:where(table){border-collapse:collapse;border-color:inherit;text-indent:0}:where(button,input,select){margin:0}:where(button,[type=button i],[type=reset i],[type=submit i]){-webkit-appearance:button}:where(fieldset){border:1px solid #a0a0a0}:where(progress){vertical-align:baseline}:where(textarea){margin:0;resize:vertical}:where([type=search i]){-webkit-appearance:textfield;outline-offset:-2px}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}:where(dialog){background-color:#fff;border:solid;color:#000;height:-moz-fit-content;height:fit-content;left:0;margin:auto;padding:1em;position:absolute;right:0;width:-moz-fit-content;width:fit-content}:where(dialog:not([open])){display:none}:where(details>summary:first-of-type){display:list-item}:where([aria-busy=true i]){cursor:progress}:where([aria-controls]){cursor:pointer}:where([aria-disabled=true i],[disabled]){cursor:not-allowed}:where([aria-hidden=false i][hidden]){display:initial}:where([aria-hidden=false i][hidden]:not(:focus)){clip:rect(0,0,0,0);position:absolute}:where(iframe,img,input,video,select,textarea){height:auto;max-width:100%}.app.svelte-ifvekf.svelte-ifvekf{display:flex;flex-direction:row;margin:0 8px;height:40px;text-align:center}.app.svelte-ifvekf label.svelte-ifvekf{display:inline-flex;flex-direction:row;flex-wrap:wrap;align-items:center;cursor:pointer;text-align:center}input[type=checkbox].svelte-ifvekf.svelte-ifvekf{display:block;-webkit-appearance:auto;-moz-appearance:auto;appearance:auto;margin:4px;width:12px;height:12px} ');

(function () {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.data === data) return;
    text2.data = /** @type {string} */
    data;
  }
  let current_component;
  function set_current_component(component) {
    current_component = component;
  }
  const dirty_components = [];
  const binding_callbacks = [];
  let render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = /* @__PURE__ */ Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  const seen_callbacks = /* @__PURE__ */ new Set();
  let flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length) binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }
  const outroing = /* @__PURE__ */ new Set();
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function mount_component(component, target, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
        if (ready) make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      flush();
    }
    set_current_component(parent_component);
  }
  class SvelteComponent {
    constructor() {
      /**
       * ### PRIVATE API
       *
       * Do not use, may change at any time
       *
       * @type {any}
       */
      __publicField(this, "$$");
      /**
       * ### PRIVATE API
       *
       * Do not use, may change at any time
       *
       * @type {any}
       */
      __publicField(this, "$$set");
    }
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  }
  const PUBLIC_VERSION = "4";
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
  function create_fragment(ctx) {
    let div;
    let label;
    let input;
    let t0;
    let span;
    let t1;
    let t2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        label = element("label");
        input = element("input");
        t0 = space();
        span = element("span");
        t1 = text("del");
        t2 = text(
          /*nth*/
          ctx[0]
        );
        attr(input, "type", "checkbox");
        attr(input, "name", "toggle");
        attr(input, "class", "svelte-ifvekf");
        attr(label, "class", "svelte-ifvekf");
        attr(div, "class", "app svelte-ifvekf");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, label);
        append(label, input);
        append(label, t0);
        append(label, span);
        append(span, t1);
        append(span, t2);
        if (!mounted) {
          dispose = listen(
            input,
            "click",
            /*click_handler*/
            ctx[2]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*nth*/
        1) set_data(
          t2,
          /*nth*/
          ctx2[0]
        );
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    console.log("working!");
    let nth = 1;
    const deletePost = () => {
      const MAX = 15;
      let loop = 0;
      const feedList = document.getElementsByClassName("feedListLayout_feed_list__Z1Jh_")[0];
      while (loop < MAX) {
        let post = feedList.querySelector(`article:nth-child(${nth})`);
        if (post === null) break;
        let postId = post.id.replace("article_", "");
        if (postId === void 0 || postId === "") break;
        if (post.querySelector(".media_image") === null) {
          console.log("no image");
          fetch("https://linevoom.line.me/api/post/delete?homeId=_dVkHnuS19n3F4QZRu6woElyJ1YUwrYkVVDKc2mk", {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "ja,en-US;q=0.9,en;q=0.8",
              baggage: "sentry-environment=production,sentry-release=3.44.1.0,sentry-public_key=1f84b015401a455abc185c9ede2d18a1,sentry-trace_id=75efc58c2367446ab8d9d2750a17ef1c,sentry-sample_rate=0.2,sentry-transaction=%2FuserHome,sentry-sampled=false",
              "content-type": "application/json",
              priority: "u=1, i",
              "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              "sentry-trace": "75efc58c2367446ab8d9d2750a17ef1c-843191a5392664d0-0",
              "x-timeline-tid": "d818e348e76802a4c1bee4e4e463cbbe",
              "x-timeline-webversion": "3.44.1.0"
            },
            referrer: "https://linevoom.line.me/user/_dVkHnuS19n3F4QZRu6woElyJ1YUwrYkVVDKc2mk",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: `{"postId":"${postId.toString}"}`,
            method: "POST",
            mode: "cors",
            credentials: "include"
          });
        } else {
          console.log("with images");
        }
        console.log(postId);
        $$invalidate(0, ++nth);
        ++loop;
      }
    };
    const click_handler = () => deletePost();
    return [nth, deletePost, click_handler];
  }
  class App extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, {});
    }
  }
  new App({
    target: (() => {
      var _a;
      const app2 = document.createElement("div");
      (_a = document.getElementById("header")) == null ? void 0 : _a.getElementsByTagName("div")[0].appendChild(app2);
      return app2;
    })()
  });

})();