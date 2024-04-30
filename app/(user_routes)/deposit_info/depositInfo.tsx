import { Deposit } from "@/types/Deposit";
import { months } from "@/types/Months";

export const DepositInfoTable = (data: Deposit) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
          Name: {data.name}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 text-blue-800 rounded-lg p-4">
          <div className="text-sm font-semibold mb-2">Payment Amount</div>
          <div className="text-lg font-bold">৳{data.amount}</div>
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-lg p-4">
          <div className="text-sm font-semibold mb-2">Extra Charges</div>
          <div className="text-lg font-bold">৳{data.extra_charges}</div>
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-lg p-4">
          <div className="text-sm font-semibold mb-2">Payment Month</div>
          <div className="text-lg font-bold">
            {months[data.payment_month - 1]}
          </div>
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-lg p-4">
          <div className="text-sm font-semibold mb-2">Payment Year</div>
          <div className="text-lg font-bold">{data.payment_year}</div>
        </div>
      </div>
    </div>
  );
};
