import { useState, FormEvent } from "react";

import { getPurchasesBySearchTerm } from "../apiService";
import Error from "./Error";
import Table from "../components/Table";
import { Purchase } from "../type";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [searchResults, setSearchResults] = useState<Purchase[]>([]);
  const [error, setError] = useState<any>(null);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    setSearchResults([]);
    setError(null);
    try {
      const data = await getPurchasesBySearchTerm(searchTerm.trim());
      setSearchResults(data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className="isolate bg-white mt-16">
      <form className="mx-auto max-w-xl" onSubmit={handleOnSubmit}>
        <div className="flex gap-x-4">
          <input
            id="search-term"
            className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            <MagnifyingGlassIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Search
          </button>
        </div>
      </form>
      {error && <Error error={error} />}
      {searchResults.length > 0 && <Table purchases={searchResults} />}
    </div>
  );
}

export default Search;
