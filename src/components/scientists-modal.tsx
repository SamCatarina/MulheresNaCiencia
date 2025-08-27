import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export interface Scientist {
  id: number;
  name: string;
  field: string;
  institution: string;
  image: string;
  research?: string;
  researchThemes?: string[];
  publications?: Publication[];
  lattes?: string;
}

export interface Publication {
  title: string;
  year: number;
  journal: string;
  link?: string;
}

interface ScientistModalProps {
  isOpen: boolean;
  onClose: () => void;
  scientist: Scientist;
}

export default function ScientistModal({
  isOpen,
  onClose,
  scientist,
}: ScientistModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-2 flex-1">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      {scientist.name}
                    </Dialog.Title>

                    <p className="text-primary font-medium text-sm">
                      {scientist.field}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {scientist.institution}
                    </p>
                    {scientist.lattes && (
                      <a
                        className="text-blue-600 text-sm underline hover:text-blue-800 cursor-pointer"
                        href={scientist.lattes}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Currículo Online
                      </a>
                    )}

                    {scientist.research && (
                      <p className="text-gray-700 text-sm mt-2">
                        <strong>Pesquisa:</strong> {scientist.research}
                      </p>
                    )}

                    {scientist.researchThemes?.length && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {scientist.researchThemes.map((theme, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    )}

                    {scientist.publications &&
                      scientist.publications.length > 0 && (
                        <div className="mt-4">
                          <strong className="text-sm">
                            Publicações recentes:
                          </strong>
                          <ul className="list-disc list-inside text-xs text-gray-600">
                            {scientist.publications.map((pub, i) => (
                              <li key={i}>
                                {pub.link ? (
                                  <a
                                    href={pub.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800"
                                  >
                                    {pub.title}
                                  </a>
                                ) : (
                                  pub.title
                                )}
                                {`, ${pub.year}, ${pub.journal}`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
