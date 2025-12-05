import React from 'react';

// Props for the UI Component
export interface DomainProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
    iconBgClass: string;
    iconTextClass: string;
    svgPath: React.ReactNode;
    image: string;
}

// Shim to fix "Property 'div' does not exist on type 'JSX.IntrinsicElements'" errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      span: any;
      p: any;
      a: any;
      ul: any;
      ol: any;
      li: any;
      button: any;
      input: any;
      label: any;
      select: any;
      option: any;
      textarea: any;
      form: any;
      img: any;
      nav: any;
      header: any;
      footer: any;
      section: any;
      main: any;
      article: any;
      aside: any;
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      h5: any;
      h6: any;
      br: any;
      svg: any;
      path: any;
      circle: any;
      defs: any;
      clipPath: any;
      g: any;
      text: any;
      rect: any;
      line: any;
      polygon: any;
      style: any;
      script: any;
      link: any;
      head: any;
      body: any;
      html: any;
      table: any;
      thead: any;
      tbody: any;
      tr: any;
      th: any;
      td: any;
      iframe: any;
      // Allow any other elements
      [elemName: string]: any;
    }
  }
}
