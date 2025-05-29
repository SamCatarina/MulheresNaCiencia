import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LikertScaleProps {
  question: string;
  value: string;
  onValueChange: (value: string) => void;
  options?: {
    value: string;
    label: string;
  }[];
}

const defaultOptions = [
  { value: "1", label: "Discordo totalmente" },
  { value: "2", label: "Discordo" },
  { value: "3", label: "Neutro" },
  { value: "4", label: "Concordo" },
  { value: "5", label: "Concordo totalmente" },
];

export default function LikertScale({ 
  question, 
  value, 
  onValueChange, 
  options = defaultOptions 
}: LikertScaleProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">{question}</Label>
      <RadioGroup value={value} onValueChange={onValueChange} className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <RadioGroupItem 
              value={option.value} 
              id={`${question}-${option.value}`}
              className="text-primary"
            />
            <Label 
              htmlFor={`${question}-${option.value}`} 
              className="flex-1 cursor-pointer text-sm"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}