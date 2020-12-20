import React, { useEffect } from "react";

function MicroFrontend({ name, host }) {
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    const renderMicroFrontend = () => {
      window[`render${name}`](`${name}-container`);
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();

      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement("script");

        script.id = scriptId;
        script.crossOrigin = "";
        // script.src = `${host}${manifest.files["main.js"]}`;
        const index = host.lastIndexOf("/");
        const newHost = host.subString(0, index);
        script.src = `${newHost}${manifest.files["main.js"]}`;
        script.onload = () => {
          renderMicroFrontend();
        };

        document.head.appendChild(script);
      });

    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    };
  }, []);

  return <main id={`${name}-container`} />;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
