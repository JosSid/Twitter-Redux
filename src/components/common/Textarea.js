import classNames from 'classnames';
import { forwardRef, useEffect, useRef } from 'react';

import './Textarea.css';

const Textarea = forwardRef(({ className, autofocus, ...props }, ref) => {
  // const textareaRef = useRef();

  // useEffect(() => {
  //   if (autofocus) {
  //     textareaRef.current.focus();
  //   }
  // }, [autofocus]);{textareaRef}

  return (
    <div className={classNames('textarea', className)}>
      <textarea ref={ref} className="textarea-input" {...props} />
    </div>
  );
});

export default Textarea;
