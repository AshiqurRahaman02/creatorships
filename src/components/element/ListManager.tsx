import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface ListManagerProps {
    label: string;
    items: string[];
    onItemsChange: (updatedItems: string[]) => void;
}

const ListManager: React.FC<ListManagerProps> = ({ label, items, onItemsChange }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const addItem = () => {
        if (inputValue) {
            onItemsChange([...items, inputValue]);
            setInputValue("");
        }
    };

    const deleteItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        onItemsChange(updatedItems);
    };

    return (
        <div className="list-manager">
            <h3>{label}</h3>
            <div className="items-section">
                {items.map((item, index) => (
                    <div key={index} className="item">
                        <span>{item}</span>
                        <IconButton
                            aria-label="delete"
                            onClick={() => deleteItem(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
                <div className="flex flex-wrap items-center gap-3">
                    <TextField
                        label={`Add ${label}`}
                        value={inputValue}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={addItem}>
                        Add {label}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ListManager;
