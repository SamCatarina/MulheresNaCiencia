import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Item = {
  title: string;
  content: React.ReactNode;
};

type ExpandableListProps = {
  items: Item[];
};

export default function ExpandableList({ items }: ExpandableListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleIndex(index)}
            className="w-full text-left flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-t-lg"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {openIndex === index && (
            <div className="p-4 border-t border-gray-200 bg-white">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
