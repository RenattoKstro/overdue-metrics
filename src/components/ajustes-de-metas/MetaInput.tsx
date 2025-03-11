import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LucideIcon } from 'lucide-react';

interface MetaInputProps {
  id: string;
  label: string;
  value: number; // Alterado para number apenas
  icon: LucideIcon;
  isNumeric?: boolean;
  onUpdate: (value: number) => void;
  formatValue?: (value: number) => string; // Função opcional para formatação
}

const MetaInput: React.FC<MetaInputProps> = ({
  id,
  label,
  value,
  icon: Icon,
  isNumeric = true,
  onUpdate,
  formatValue = (val) => val.toString(), // Padrão sem formatação
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9,.]/g, '').replace(',', '.');
    setInputValue(rawValue);
  };

  const handleBlur = () => {
    const numericValue = isNumeric
      ? parseFloat(inputValue.replace(',', '.')) || 0
      : parseInt(inputValue, 10) || 0;
    onUpdate(numericValue);
    setInputValue(numericValue.toString()); // Volta ao valor bruto
    setIsEditing(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(true);
    e.target.select();
  };

  const displayValue = isEditing ? inputValue : formatValue(value);

  return (
    <div>
      <Label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-700">{label}</Label>
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-blue-500" />
        <Input
          id={id}
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="font-semibold text-xl border-blue-200 focus:border-blue-500"
          type={isNumeric ? "text" : "number"}
        />
      </div>
    </div>
  );
};

export default MetaInput;
