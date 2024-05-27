"use client";
import useAuth from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { getUsers } from "./getUsers";
import { months } from "@/types/Months";

interface DepositData {
  name: string;
  amount: number;
  extra_charges: number;
  payment_month: number;
  payment_year: number;
}

export default function Deposit() {
  const { token } = useAuth();
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [depositInfo, setDepositInfo] = useState<DepositData>({
    name: "",
    amount: NaN,
    extra_charges: NaN,
    payment_month: 0,
    payment_year: 2024,
  });

  const [users, setUsers] = useState<string[]>([]);
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    if (token) {
      getUsers(token).then((data) => {
        setUsers(data);
      });
    }
  }, [token]);

  const handleInputChange = (field: keyof DepositData, value: string) => {
    let parsedValue: number | string = value;
    if (
      field === "amount" ||
      field === "extra_charges" ||
      field === "payment_year"
    ) {
      parsedValue = value ? parseInt(value) : NaN;
    } else if (field === "payment_month") {
      parsedValue = parseInt(value);
    }
    setDepositInfo({ ...depositInfo, [field]: parsedValue });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const response = await fetch(`${api}/admins/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(depositInfo),
      });
      const res = await response.json();
      if (response.ok) {
        console.log(res);
        setResponse(
          res.message || "Deposit information submitted successfully."
        );
      } else {
        console.error("Error submitting deposit information:", res);
        setResponse(res.message || "Error submitting deposit information.");
      }
    } catch (error) {
      console.error("Error submitting deposit information:", error);
      setResponse("Error submitting deposit information.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Deposit</h1>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-blue-100 rounded-lg p-4">
          <label
            htmlFor="name"
            className="block text-md font-medium text-gray-700"
          >
            Name
          </label>
          <select
            id="name"
            value={depositInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-800 text-[18px]"
          >
            <option value="">Select User</option>
            {users.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <label
            htmlFor="amount"
            className="block text-md font-medium text-gray-700"
          >
            Payment Amount
          </label>
          <input
            type="number"
            id="amount"
            value={isNaN(depositInfo.amount) ? "" : depositInfo.amount}
            onChange={(e) => handleInputChange("amount", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-800 text-[18px]"
          />
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <label
            htmlFor="extra_charges"
            className="block text-md font-medium text-gray-700"
          >
            Extra Charges
          </label>
          <input
            type="number"
            id="extra_charges"
            value={
              isNaN(depositInfo.extra_charges) ? "" : depositInfo.extra_charges
            }
            onChange={(e) => handleInputChange("extra_charges", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-800 text-[18px]"
          />
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <label
            htmlFor="payment_month"
            className="block text-md font-medium text-gray-700"
          >
            Payment Month
          </label>
          <select
            id="payment_month"
            value={depositInfo.payment_month}
            onChange={(e) => handleInputChange("payment_month", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-800 text-[18px]"
          >
            <option value={0}>Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <label
            htmlFor="payment_year"
            className="block text-md font-medium text-gray-700"
          >
            Payment Year
          </label>
          <input
            type="number"
            id="payment_year"
            value={
              isNaN(depositInfo.payment_year) ? "" : depositInfo.payment_year
            }
            onChange={(e) => handleInputChange("payment_year", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-800"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
      {loading && (
        <div className="mt-4 text-center text-gray-500">Loading...</div>
      )}
      {response && response.length > 0 && (
        <div className="mt-4 bg-blue-100 text-blue-800 rounded-lg inline-block px-4 py-2">
          {response}
        </div>
      )}
    </div>
  );
}
