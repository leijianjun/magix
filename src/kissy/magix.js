/**
 * @fileOverview Magix全局对象
 * @author 行列<xinglie.lkf@taobao.com>
 * @version edge
 **/
KISSY.add('magix', function(S, SE) {
    var G_Require = function(name, fn) {
        S.use(name && (name + G_EMPTY), function(S) {
            if (fn) {
                fn.apply(S, G_Slice.call(arguments, 1));
            }
        });
    };
    var G_Extend = S.extend;
    var G_IsObject = S.isObject;
    var G_IsArray = S.isArray;
    var G_DOM = S.DOM;
    var G_HTML = G_DOM.html;

    /*#if(modules.style){#*/
    var View_ApplyStyle = function(key, css, node, sheet) {
        if (css && !View_ApplyStyle[key]) {
            View_ApplyStyle[key] = 1;
            node = S.one(G_HashKey + MxStyleGlobalId);
            if (node) {
                sheet = node.prop('styleSheet');
                if (sheet) {
                    sheet.cssText += css;
                } else {
                    node.append(css);
                }
            } else {
                S.one('head').append('<style id="' + MxStyleGlobalId + '">' + css + '</style>');
            }
        }
    };
    /*#}#*/
    Inc('../tmpl/magix');
    Inc('../tmpl/event');
    var Router_Edge;
    /*#if(modules.router){#*/
    /*#if(!modules.forceEdgeRouter){#*/
    var Win = S.one(G_WINDOW);
    var Router_Update = function(path, params, loc, replace, lQuery) {
        path = G_ToUri(path, params, lQuery);
        if (path != loc.srcHash) {
            path = '#!' + path;
            if (replace) {
                Router_WinLoc.replace(path);
            } else {
                Router_WinLoc.hash = path;
            }
        }
    };
    /*#if(modules.tiprouter){#*/
    var Router_Bind = function() {
        var lastHash = Router.parse().srcHash;
        var newHash;
        Win.on('hashchange', function(e, loc) {
            loc = Router.parse();
            newHash = loc.srcHash;
            if (newHash != lastHash) {
                e = {
                    backward: function() {
                        e.p = 1;
                        location.hash = '#!' + lastHash;
                    },
                    forward: function() {
                        e.p = 1;
                        lastHash = newHash;
                        Router.diff();
                    },
                    prevent: function() {
                        e.p = 1;
                    },
                    location: loc
                };
                Router.fire('change', e);
                if (!e.p) {
                    e.forward();
                }
            }
        });
        window.onbeforeunload = function(e) {
            e = e || window.event;
            var te = {};
            Router.fire('pageunload', te);
            if (te.msg) {
                if (e) e.returnValue = te.msg;
                return te.msg;
            }
        };
        Router.diff();
    };
    /*#}else{#*/
    var Router_Bind = function() {
        Win.on('hashchange', Router.diff);
        Router.diff();
    };
    /*#}#*/
    /*#}#*/
    /*#if(modules.edgeRouter||modules.forceEdgeRouter){#*/
    var WinHistory = G_WINDOW.history;
    /*#if(!modules.forceEdgeRouter){#*/
    if (WinHistory.pushState) {
        /*#}#*/
        Router_Edge = 1;
        var Router_DidUpdate;
        var Router_Update = function(path, params, loc, replace) {
            path = G_ToUri(path, params);
            if (path != loc.srcQuery) {
                WinHistory[replace ? 'replaceState' : 'pushState'](G_NULL, G_NULL, path);
                Router.diff();
            }
        };
        /*#if(modules.tiprouter){#*/
        var Router_Bind = function() {
            var initialURL = Router_WinLoc.href;
            var lastHref = initialURL;
            var newHref;
            Win.on('popstate', function(e) {
                newHref = Router_WinLoc.href;
                var initPop = !Router_DidUpdate && newHref == initialURL;
                Router_DidUpdate = 1;
                if (initPop) return;
                if (newHref != lastHref) {
                    e = {
                        backward: function() {
                            e.p = 1;
                            history.replaceState(G_NULL, G_NULL, lastHref);
                        },
                        forward: function() {
                            e.p = 1;
                            lastHref = newHref;
                            Router.diff();
                        },
                        prevent: function() {
                            e.p = 1;
                        },
                        location: Router.parse()
                    };
                    Router.fire('change', e);
                    if (!e.p) {
                        e.forward();
                    }
                }
            });
        };
        /*#}else{#*/
        var Router_Bind = function() {
            var initialURL = Router_WinLoc.href;
            Win.on('popstate', function() {
                var initPop = !Router_DidUpdate && Router_WinLoc.href == initialURL;
                Router_DidUpdate = 1;
                if (initPop) return;
                Router.diff();
            });
            Router.diff();
        };
        /*#}#*/
        /*#if(!modules.forceEdgeRouter){#*/
    }
    /*#}#*/
    /*#}#*/
    /*#}#*/

    Inc('../tmpl/router');
    var $ = S.all;
    Inc('../tmpl/vframe');
    var Body_DOMGlobalProcessor = function(e, me) {
        me = this;
        G_ToTry(me.f, e, me.v);
    };
    var Body_DOMEventLibBind = function(node, type, cb, remove, selector, scope) {
        if (scope) {
            SE[(remove ? 'un' : G_EMPTY) + 'delegate'](node, type, selector, cb, scope);
        } else {
            SE[remove ? 'detach' : Event_ON](node, type, cb, scope);
        }
    };
    Inc('../tmpl/body');
    Inc('../tmpl/tmpl');
    Inc('../tmpl/updater');
    /*#if(modules.fullstyle){#*/
    var View_Style_Cache = new G_Cache(15, 5, function(key) {
        S.one(G_HashKey + key).remove();
    });
    var View_ApplyStyle = function(key, css) {
        if (css) {
            if (!View_Style_Cache.has(key)) {
                S.one('head').append('<style id="' + key + '">' + css + '</style>');
            }
            View_Style_Cache.num(key, 1);
            //$(node).addClass(key);
        }
    };
    var View_RemoveStyle = function(key) {
        if (key) {
            //$(node).removeClass(key);
            View_Style_Cache.num(key);
        }
    };
    /*#}#*/
    Inc('../tmpl/view');

    /*#if(modules.service){#*/
    var G_Type = S.type;
    var G_Proxy = S.bind;
    var G_Now = S.now;

    /*#}#*/
    //!@vars service
    Inc('../tmpl/service');
    /*#if(modules.base){#*/
    var T_Extend = function(props, statics) {
        var me = this;
        var ctor = props && props.ctor;
        var X = function() {
            var t = this,
                a = arguments;
            me.apply(t, a);
            if (ctor) ctor.apply(t, a);
        };
        X.extend = T_Extend;
        return G_Extend(X, me, props, statics);
    };
    G_Mix(G_NOOP[G_PROTOTYPE], Event);
    G_NOOP.extend = T_Extend;
    /**
     * 组件基类
     * @name Base
     * @constructor
     * @borrows Event.fire as #fire
     * @borrows Event.on as #on
     * @borrows Event.off as #off
     * @beta
     * @module base
     */
    Magix.Base = G_NOOP;
    /*#}#*/
    /*#if(modules.core){#*/
    S.add(MxGlobalView, function() {
        return View.extend(
            /*#if(!modules.autoEndUpdate){#*/
            {
                render: function() {
                    this.endUpdate();
                }
            }
            /*#}#*/
        );
    });
    /*#}#*/
    return Magix;
}, {
    requires: ['event', 'node']
});