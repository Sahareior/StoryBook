import Quill from "quill";
import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import "quill/dist/quill.snow.css";
import "./editor.css";

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    // Extract content from nested structure
    const extractContent = (data) => {
      if (!data) return "";
      
      // If data has a 'text' property, use that
      if (typeof data === 'object' && data.text) {
        return data.text;
      }
      
      // If data is already a string, use it directly
      if (typeof data === 'string') {
        return data;
      }
      
      return "";
    };

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      // ✅ Expose quill instance
      if (typeof ref === "function") {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      // ✅ Handle both Delta and HTML
      const content = extractContent(defaultValueRef.current);
      if (content) {
        if (typeof content === "string") {
          // HTML string → insert into editor
          quill.clipboard.dangerouslyPasteHTML(0, content);
        } else {
          // Assume Delta object
          quill.setContents(content);
        }
      }

      // Listeners
      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (typeof ref === "function") {
          ref(null);
        } else if (ref) {
          ref.current = null;
        }
        container.innerHTML = "";
      };
    }, [ref]);

    useEffect(() => {
      if (ref?.current) {
        ref.current.enable(!readOnly);
      }
    }, [readOnly, ref]);

    return <div ref={containerRef} style={{ height: "40vh" }} />;
  }
);

Editor.displayName = "Editor";

export default Editor;