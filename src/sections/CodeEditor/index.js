import React from 'react';

import { useStore } from 'store';
import { useEditor } from 'utils/hooks';
import Editor from 'components/Editor';

import { ensureLastLine } from 'utils';

const CodeEditor = ({ enqueueSnackbar }) => {
  const [, setGetter] = useEditor();
  const { state: { custom: { formula } }, actions: { setIsEditorReady } } = useStore();

  function editorDidMount(getter) {
    setGetter(_ => getter);
    setIsEditorReady(true);
  }

  return <div className="full-size">
    <Editor
      value={ensureLastLine(formula)}
      editorDidMount={editorDidMount}
    />
  </div>;
};

export default CodeEditor;
