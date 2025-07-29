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
  options = defaultOptions,
}: LikertScaleProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{question}</Label>
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="flex flex-wrap gap-4"
      >
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`${question}-${option.value}`}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <RadioGroupItem
              value={option.value}
              id={`${question}-${option.value}`}
              className="text-primary"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
