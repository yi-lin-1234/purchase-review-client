import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment, useRef } from "react";
import { getPurchaseById, deletePurchaseById } from "../apiService";
import { Dialog, Transition } from "@headlessui/react";

import {
  PencilSquareIcon,
  TrashIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { Purchase } from "../type";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [purchase, setPurchase] = useState<Purchase>({
    ID: "",
    Name: "",
    Price: 0,
    Amount: 0,
    Category: "",
    ImageUrl: "",
    Evaluation: "",
    Link: "",
    Note: "",
    CreatedAt: "",
    DeletedAt: "",
    UpdatedAt: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function initialSetUp() {
      if (!id) {
        console.log("No ID provided");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getPurchaseById(id);
        setPurchase(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  const handleOnDelete = async () => {
    if (!id) {
      console.log("No ID provided");
      return;
    }
    try {
      await deletePurchaseById(id);
      navigate("/dashboard/all");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        delete purchase review
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          delete your purchase review permanently?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleOnDelete}
                    >
                      delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <span className="font-medium text-gray-500 hover:text-gray-900">
              {purchase.Category}
            </span>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {purchase.Name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  ${purchase.Price}
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  {purchase.Evaluation === "good" ? (
                    <HandThumbUpIcon className="text-green-400 h-5 w-5 flex-shrink-0" />
                  ) : (
                    <HandThumbDownIcon className="text-red-400 h-5 w-5 flex-shrink-0" />
                  )}
                </div>
                <div className="ml-4 border-l border-gray-300 pl-4">
                  <span className="font-medium text-gray-500">
                    Qty {purchase.Amount}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{purchase.Note}</p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden">
              <img
                src={purchase.ImageUrl}
                alt="product"
                className="h-4/6 w-4/6 object-cover object-center rounded-lg"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div className="mt-10">
              <a
                href={purchase.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3 inline-flex items-center rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
              >
                <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                Visit Product Website
              </a>
              <Link to={`/dashboard/edit/${purchase.ID}`}>
                <button className="mr-3 inline-flex items-center rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
                  <PencilSquareIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                  edit
                </button>
              </Link>

              <button
                type="button"
                className="inline-flex items-center rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                onClick={() => setOpen(true)}
              >
                <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
