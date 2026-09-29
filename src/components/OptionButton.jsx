import React from 'react';

export default function OptionButton({ option, index, selected, onSelect }) {
    return (
        <div className={`form-check border rounded p-3 ${selected ? 'border-primary bg-primary-subtle' : ''}`}>
            <input
                className="form-check-input"
                type="radio"
                name="option"
                id={`option-${index}`}
                checked={selected}
                onChange={() => onSelect(index)}
            />
            <label className="form-check-label w-100" htmlFor={`option-${index}`} style={{ cursor: 'pointer' }}>
                {option.text}
            </label>
        </div>
    );
}