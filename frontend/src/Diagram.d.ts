import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import diagramCode from './diagram.mmd';
const MermaidDiagram: React.FC = () => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);

  return (
    <div
      className="mermaid"
      dangerouslySetInnerHTML={{
        __html: mermaid.render('graphDiv', diagramCode),
      }}
    />
  );
};

export default MermaidDiagram;
