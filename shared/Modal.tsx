import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useState, useEffect } from "react";
import { HiX } from "react-icons/hi";

interface ModalProps {
  show?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: React.ReactNode | string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "screen";
  unmount?: boolean;
}

export function Modal({
  show = false,
  onClose = null,
  onConfirm = null,
  title = "",
  size = "sm",
  children,
  unmount = true,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(show);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };
  return (
    <Transition appear show={show} as={Fragment} unmount={unmount}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
        unmount={unmount}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            unmount={unmount}
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900/75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            unmount={unmount}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={classNames(
                `inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-50 shadow-xl rounded-2xl`,
                {
                  "max-w-lg": size === "sm",
                  "max-w-5xl": size === "md",
                  "max-w-6xl": size === "lg",
                  "max-w-7xl": size === "xl",
                  "max-w-full": size === "screen",
                }
              )}
            >
              <div className="flex items-center w-full justify-between">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                {onClose && (
                  <button title="Close Modal" onClick={handleClose}>
                    <HiX />
                  </button>
                )}
              </div>

              <div className="mt-2">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
