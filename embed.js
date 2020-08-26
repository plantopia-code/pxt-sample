(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/turorials/",
    "verprefix": "",
    "workerjs": "/turorials/worker.js",
    "monacoworkerjs": "/turorials/monacoworker.js",
    "gifworkerjs": "/turorials/gifjs/gif.worker.js",
    "serviceworkerjs": "/turorials/serviceworker.js",
    "pxtVersion": "6.3.2",
    "pxtRelId": "",
    "pxtCdnUrl": "/turorials/",
    "commitCdnUrl": "/turorials/",
    "blobCdnUrl": "/turorials/",
    "cdnUrl": "/turorials/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "sample",
    "simUrl": "/turorials/simulator.html",
    "simserviceworkerUrl": "/turorials/simulatorserviceworker.js",
    "simworkerconfigUrl": "/turorials/workerConfig.js",
    "partsUrl": "/turorials/siminstructions.html",
    "runUrl": "/turorials/run.html",
    "docsUrl": "/turorials/docs.html",
    "multiUrl": "/turorials/multi.html",
    "asseteditorUrl": "/turorials/asseteditor.html",
    "isStatic": true
};

    var scripts = [
        "/turorials/highlight.js/highlight.pack.js",
        "/turorials/bluebird.min.js",
        "/turorials/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/turorials/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/turorials/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/turorials/target.js");
    scripts.push("/turorials/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
