"use client";
import useAuth from "@/lib/hooks/useAuth";
import { useState } from "react";
import { DepositInfoTable } from "./depositInfo";
import { Deposit } from "../../../types/Deposit";
import { months } from "@/types/Months";

interface DepositInfoData {
  month: number;
  year: number;
}

export default function DepositInfo() {
  const { token } = useAuth();
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [depositInfo, setDepositInfo] = useState({});
  const [depositTime, setDepositTime] = useState<DepositInfoData>({
    month: 1,
    year: 2024,
  });
  const [showInfo, setShowInfo] = useState<boolean>(false);

  async function onSubmit(
    data: DepositInfoData,
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoading(true);
    setShowInfo(true);

    try {
      const response = await fetch(
        `${api}/users/user_deposited/${data.month}/${data.year}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      if (response.ok) {
        setDepositInfo(res);
        console.log(res);
      } else {
        setDepositInfo({});
        setShowInfo(false);
        console.error("Error fetching deposit information:", res);
      }
    } catch (error) {
      console.error("Error fetching deposit information:", error);
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Deposit Info</h1>
      <form
        onSubmit={(e) => {
          onSubmit({ month: depositTime.month, year: depositTime.year }, e);
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label
            htmlFor="month"
            className="block text-md font-medium text-gray-700 "
          >
            Month
          </label>
          <select
            style={{ color: "black", fontSize: "18px" }}
            id="month"
            value={depositTime.month}
            onChange={(e) =>
              setDepositTime({
                ...depositTime,
                month: parseInt(e.target.value),
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value={0}>Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="year"
            className="block text-md font-medium text-gray-700"
          >
            Year
          </label>
          <input
            style={{ color: "black", fontSize: "18px" }}
            type="number"
            id="year"
            value={depositTime.year}
            onChange={(e) =>
              setDepositTime({
                ...depositTime,
                year: parseInt(e.target.value),
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
      {showInfo && <DepositInfoTable {...(depositInfo as Deposit)} />}
    </div>
  );
}
