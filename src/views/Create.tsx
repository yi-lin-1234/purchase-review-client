import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

import { createNewPurchase } from "../apiService";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import CustomRadioGroup from "../components/CustomRadioGroup";

import { PhotoIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";

function Create() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [evaluation, setEvaluation] = useState<string>("good");
  const [link, setLink] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const evaluation_options = ["good", "bad"];

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files && files.length !== 0) {
      setImage((prevState) => files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  }

  async function handleImageUpload() {
    try {
      const data = new FormData();
      if (image) {
        data.append("file", image);
        data.append("upload_preset", "purchaseApp");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/yilin1234/image/upload",
          data
        );
        return response.data.secure_url;
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading image."); // Set error state
    }
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    const ImageUrl = await handleImageUpload();

    // Validate text input fields (should not be just spaces)
    if (!name.trim() || !category.trim() || !link.trim() || !notes.trim()) {
      alert("Text fields cannot be empty or consist of only spaces.");
      return;
    }

    // Validate totalPrepTime (it should be greater than 0)
    if (price <= 0 || amount <= 0) {
      alert("Number field must be greater than 0.");
      return;
    }

    // Initialize request body
    const body = {
      Name: name,
      Price: price,
      Amount: amount,
      Category: category.trim(),
      Evaluation: evaluation.trim(),
      Note: notes,
      ImageUrl: ImageUrl,
      Link: link,
    };

    try {
      await createNewPurchase(body);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError(error);
    }
  }

  return (
    <div className="isolate bg-white p-10">
      <form className="mx-auto max-w-xl" onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2.5">
              <input
                id="price"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="amount"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Amount
            </label>
            <div className="mt-2.5">
              <input
                id="amount"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2.5">
              <input
                id="category"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="productImage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product picture
            </label>
            <div className="mt-3 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="productImage"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
              >
                upload an image{" "}
                <ArrowUpOnSquareIcon
                  className="-mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                <input
                  className="sr-only"
                  id="productImage"
                  type="file"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" width="300" />
                ) : (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <CustomRadioGroup
              label="Evaluation"
              value={evaluation}
              onChange={setEvaluation}
              options={evaluation_options}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="link"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Link
            </label>
            <div className="mt-2.5">
              <input
                id="link"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Notes
            </label>
            <div className="mt-2.5">
              <textarea
                id="notes"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 mt-6">
          {error && <ErrorAlert error={error} />}
          {success && (
            <SuccessAlert message="new purchase create successfully!" />
          )}
          <button
            type="submit"
            className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
