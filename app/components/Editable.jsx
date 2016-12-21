import React from 'react';

import classnames from 'classnames';

export default ({editing, value, onEdit, className, ...props}) => {
  if(editing) {
    return <Edit
      className={className}
      value={value}
      onEdit={onEdit}
      {...props} />;
  }
  return <span className={classnames('value', className)} {...props}>
    {value}
  </span>;
}

class Edit extends React.Component {
  render() {
    const {className, value, onEdit, ...props} = this.props;

    return <div className="ui fluid input">
        <input
        type="text"
        className={classnames('edit', className)}
        autoFocus={true}
        defaultValue={value}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
        {...props} />
      </div>;
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }
  
  finishEdit = (e) => {
    const value = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(value);
    }
  }
}
