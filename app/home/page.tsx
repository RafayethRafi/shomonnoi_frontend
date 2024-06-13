"use client";
import { useEffect, useState } from "react";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

interface DepositData {
  name: string;
  amount: number;
}

interface ApiResponse {
  successful_mails: string[];
  unsuccessful_mails: string[];
}

const nameList = [
  "Mashrur Rifat",
  "Sanoar Hossain",
  "Akram Ullah Ahad",
  "Rafayet Habib",
  "Sadman Al-Mahmud",
  "Md. Jafrul Hasan",
  "Jahid Hasan Emon",
  "MD. Faisal Khan",
  "Nur Islam Sojib",
  "Kazi Afsar Uddin",
  "Mohammad Farhan Haidar",
  "MD. Arifur Rahman",
  "afnanshorif145@gmail.com",
  "Md Mohidul Alam",
  "Imran Kayes",
  "Mushfiqul Islam",
];

export default function Deposit() {
  const router = useRouter();
  const { token , logout} = useAuth();
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<{ [key: string]: number }>({});
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleCheckboxChange = (name: string) => {
    setSelectedNames((prevSelectedNames) =>
      prevSelectedNames.includes(name)
        ? prevSelectedNames.filter((n) => n !== name)
        : [...prevSelectedNames, name]
    );
  };

  const handleAmountChange = (name: string, amount: string) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [name]: amount ? parseInt(amount) : 0,
    }));
  };

  const submitData = async () => {
    setResponse(null);
    try {
      const data: DepositData[] = selectedNames.map((name) => ({
        name,
        amount: amounts[name] || 0,
      }));

      const response = await fetch(`${api}/admins/send_deposit_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData: ApiResponse = await response.json();

      if (response.ok) {
        setResponse(responseData);
      } else {
        setResponse(responseData);
      }
    } catch (error) {
      console.error("Error submitting deposit information:", error);
      setResponse({ successful_mails: [], unsuccessful_mails: [] });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Deposit</h1>
      <div className="grid grid-cols-1 gap-4">
        {nameList.map((name) => (
          <div key={name} className="bg-blue-100 rounded-lg p-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={name}
                checked={selectedNames.includes(name)}
                onChange={() => handleCheckboxChange(name)}
                className="mr-4"
              />
              <label htmlFor={name} className="block text-lg font-medium text-gray-700">
                {name}
              </label>
            </div>
            <input
              type="number"
              value={amounts[name] || ""}
              onChange={(e) => handleAmountChange(name, e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-800 text-lg px-4 py-2"
              placeholder="Amount"
              disabled={!selectedNames.includes(name)}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={submitData}
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-3 px-6 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
      >
        Submit
      </button>
      {response && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Response:
          </h2>
          {response.successful_mails.length > 0 && (
            <div className="bg-green-100 text-green-800 rounded-lg px-4 py-2 mb-2">
              <h3 className="font-semibold">Successful Mails:</h3>
              <ul>
                {response.successful_mails.map((mail) => (
                  <li key={mail}>{mail}</li>
                ))}
              </ul>
            </div>
          )}
          {response.unsuccessful_mails.length > 0 && (
            <div className="bg-red-100 text-red-800 rounded-lg px-4 py-2">
              <h3 className="font-semibold">Unsuccessful Mails:</h3>
              <ul>
                {response.unsuccessful_mails.map((mail) => (
                  <li key={mail}>{mail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <button
          // make the button in the top right corner for mobile
          className="absolute top-3 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          logout
        </button>
    </div>
  );
}