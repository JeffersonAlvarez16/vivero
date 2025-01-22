'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/utils/format';
import { toast } from 'sonner';
import Icon from './Icon';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    const message = items
      .map((item) => `• ${item.cantidad}x ${item.nombre} - ${formatPrice(item.precio * item.cantidad)}`)
      .join('\n');

    const whatsappMessage = encodeURIComponent(
      `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${message}\n\nTotal: ${formatPrice(total)}`
    );

    window.open(`https://wa.me/573123456789?text=${whatsappMessage}`, '_blank');
    clearCart();
    setIsOpen(false);
    toast.success('¡Gracias por tu pedido!', {
      description: 'Te contactaremos pronto por WhatsApp',
    });
  };

  return (
    <>
      <button
        id="toggle-cart"
        type="button"
        className="relative rounded-full p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Ver carrito</span>
        <Icon icon={ShoppingBagIcon} className="h-6 w-6" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-xs font-medium text-white">
            {items.reduce((acc, item) => acc + item.cantidad, 0)}
          </span>
        )}
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Carrito de compras
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="sr-only">Cerrar panel</span>
                              <Icon icon={XMarkIcon} className="h-6 w-6" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.imagen}
                                      alt={item.nombre}
                                      className="h-full w-full object-cover object-center"
                                      onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.src = '/plantas/default-plant.jpg';
                                        img.onerror = null;
                                      }}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.nombre}</h3>
                                        <p className="ml-4">{formatPrice(item.precio * item.cantidad)}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => updateQuantity(item.id, Math.max(1, item.cantidad - 1))}
                                          className="rounded-md bg-red-500 px-2 py-1 hover:bg-red-200"
                                        >
                                          -
                                        </button>
                                        <span className="font-medium font-semibold text-black">{item.cantidad}</span>
                                        <button
                                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                                          className="rounded-md bg-green-500 px-2 py-1 hover:bg-green-200"
                                        >
                                          +
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeItem(item.id)}
                                          className="font-medium text-red-600 hover:text-red-500"
                                        >
                                          <Icon icon={TrashIcon} className="h-5 w-5" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>{formatPrice(total)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Envío y descuentos calculados al finalizar la compra.
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={handleCheckout}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                          >
                            Hacer pedido por WhatsApp
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            o{' '}
                            <button
                              type="button"
                              className="font-medium text-green-600 hover:text-green-500"
                              onClick={() => setIsOpen(false)}
                            >
                              Continuar comprando
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
