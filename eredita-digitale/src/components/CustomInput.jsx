import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';

const CustomInput = React.memo(({ 
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  className,
  helpText,
  required = false,
  ...props
}) => {
  const handleChange = useCallback((e) => {
    e.persist(); // Importante per eventi sintetici in React
    onChange(e);
  }, [onChange]);

  return (
    <Form.Group className="mb-3">
      {label && <Form.Label className="text-white-50">{label}</Form.Label>}
      <Form.Control
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        required={required}
        {...props}
      />
      {helpText && <Form.Text className="text-white-50">{helpText}</Form.Text>}
    </Form.Group>
  );
});

export default CustomInput;