import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type CareerArea = {
  label: string;
  url?: string;
};

type Item = {
  title: string;
  content: string;
  areas: CareerArea[];
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
    <div className="space-y-4 mb-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg shadow-sm"
        >
          <button
            onClick={() => toggleIndex(index)}
            className="w-full text-left flex justify-between items-center p-4 rounded-t-lg transition-all duration-200 hover:brightness-95"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {openIndex === index && (
            <div className="p-4 border-t border-gray-200 bg-white space-y-4">
              <p className="text-gray-700">{item.content}</p>
              <div>
                <h4 className="mb-2 mt-8">Opções de carreira:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.areas.map((area, i) =>
                    area.url ? (
                      <a
                        key={i}
                        href={area.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-sm word-color underline underline-offset-2 rounded-full hover:cursor-pointer transition-colors"
                      >
                        {area.label}
                      </a>
                    ) : (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm word-color rounded-full"
                      >
                        {area.label}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
