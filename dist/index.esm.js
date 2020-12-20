import React, { useEffect } from 'react';

function MicroFrontend(_ref) {
  var name = _ref.name,
      host = _ref.host;
  useEffect(function () {
    var scriptId = "micro-frontend-script-".concat(name);

    var renderMicroFrontend = function renderMicroFrontend() {
      window["render".concat(name)]("".concat(name, "-container"));
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch("".concat(host, "/asset-manifest.json")).then(function (res) {
      return res.json();
    }).then(function (manifest) {
      var script = document.createElement("script");
      script.id = scriptId;
      script.crossOrigin = ""; // script.src = `${host}${manifest.files["main.js"]}`;

      var index = host.lastIndexOf("/");
      var newHost = host.subString(0, index);
      script.src = "".concat(newHost).concat(manifest.files["main.js"]);

      script.onload = function () {
        renderMicroFrontend();
      };

      document.head.appendChild(script);
    });
    return function () {
      window["unmount".concat(name)] && window["unmount".concat(name)]("".concat(name, "-container"));
    };
  }, []);
  return /*#__PURE__*/React.createElement("main", {
    id: "".concat(name, "-container")
  });
}

MicroFrontend.defaultProps = {
  document: document,
  window: window
};

export default MicroFrontend;
