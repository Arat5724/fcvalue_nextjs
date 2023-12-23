"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
    testtest: any;
  }
}

function insertScript(id: string, parentElement: HTMLElement) {
  const script = window.document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.id = id;
  script.innerHTML = `(adsbygoogle = window.adsbygoogle || []).push({});`;
  parentElement.appendChild(script);
}

const removeScript = (id: string, parentElement: HTMLElement) => {
  const script = window.document.getElementById(id);
  if (script) {
    parentElement.removeChild(script);
  }
};

const manageScript = (id: string) => () => {
  if (!window) {
    return () => { };
  }
  const { document } = window;
  if (document.getElementById(id)) {
    insertScript(`${id}-script`, document.body);
  }
  return () => removeScript(`${id}-script`, document.body);
};

export function ScriptTest() {
  const pathname = usePathname();
  useEffect(manageScript("script-test-div"), []);
  return <>
    <div id="script-test-div">
      hihi
    </div>
  </>;
}

export function AdInArticle() {
  const pathname = usePathname();
  const id = "ad--inarticle";
  useEffect(manageScript(id), [pathname]);
  return <>
    <div id={id}>
      <ins className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-1954438714964825"
        data-ad-slot="2885638895"></ins>
    </div>
  </>;
}

export function AdHorizontal() {
  const pathname = usePathname();
  const id = "ad--horizontal";
  useEffect(manageScript(id), [pathname]);
  return <>
    <div id={id}>
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1954438714964825"
        data-ad-slot="4819088540"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  </>;
}