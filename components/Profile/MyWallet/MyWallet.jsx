import React, { useState } from "react";

import gpay from "../../../src/assets/GooglePay.png";
import Phonepay from "../../../src/assets/Phonepay.png";
import Paytm from "../../../src/assets/paytm.png";

const MyWallet = () => {
  const [wallet, setWallet] = useState({
    bankName: "Federal Bank",
    accountNumber: "865231245784512",
    ifsc: "FED12345678R",
  });

  const [upiState, setUpiState] = useState({
    gpay: { showInput: false, upiId: "" },
    phonepe: { showInput: false, upiId: "" },
    paytm: { showInput: false, upiId: "" },
  });

  const [linkedUpis, setLinkedUpis] = useState({
    gpay: "",
    phonepe: "",
    paytm: "",
  });

  const handleLinkClick = (method) => {
    setUpiState((prev) => ({
      ...prev,
      [method]: { ...prev[method], showInput: true },
    }));
  };

  const handleUpiChange = (method, value) => {
    setUpiState((prev) => ({
      ...prev,
      [method]: { ...prev[method], upiId: value },
    }));
  };

  const handleCancel = (method) => {
    setUpiState((prev) => ({
      ...prev,
      [method]: { showInput: false, upiId: "" },
    }));
  };

  const handleLinkConfirm = (method) => {
    if (upiState[method].upiId.trim() === "") return; // prevent empty linking

    setLinkedUpis((prev) => ({
      ...prev,
      [method]: upiState[method].upiId.trim(),
    }));
    setUpiState((prev) => ({
      ...prev,
      [method]: { showInput: false, upiId: "" },
    }));
  };

  const paymentMethods = [
    { key: "gpay", name: "Google Pay", icon: gpay },
    { key: "phonepe", name: "PhonePe", icon: Phonepay },
    { key: "paytm", name: "Paytm", icon: Paytm },
  ];

  return (
    <div className="space-y-6 max-w-md mx-auto pb-20">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">My Wallet</h2>
        <p className="text-gray-500 text-sm">
          Here you can view your wallet details
        </p>
      </div>

      {/* Bank Details Card */}
      <div className="space-y-3 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-sm">Bank Details</h3>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={wallet.bankName}
          onChange={(e) => setWallet({ ...wallet, bankName: e.target.value })}
          placeholder="Bank Name"
        />
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={wallet.accountNumber}
          onChange={(e) =>
            setWallet({ ...wallet, accountNumber: e.target.value })
          }
          placeholder="Account Number"
        />
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={wallet.ifsc}
          onChange={(e) => setWallet({ ...wallet, ifsc: e.target.value })}
          placeholder="IFSC Code"
        />
      </div>

      {/* UPI Apps Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-300">
        <h3 className="font-medium text-sm mb-2">Link UPI</h3>

        {paymentMethods.map((method) => (
          <div key={method.key} className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={method.icon}
                  alt={method.name}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {!linkedUpis[method.key] ? (
                !upiState[method.key].showInput ? (
                  <button
                    onClick={() => handleLinkClick(method.key)}
                    className="text-green-600 text-sm font-medium hover:underline"
                  >
                    Link UPI
                  </button>
                ) : null
              ) : (
                <button
                  className="text-green-600  text-sm font-medium cursor-default"
                  disabled
                >
                  UPI Linked
                </button>
              )}
            </div>

            {/* Show the input box and buttons when clicking Link UPI */}
            {upiState[method.key].showInput && (
              <div className="mt-2 space-y-1">
                <p className="font-medium text-[13px] leading-[100%] tracking-[0px] font-inter">
                  Add UPI
                </p>
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiState[method.key].upiId}
                  onChange={(e) => handleUpiChange(method.key, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleCancel(method.key)}
                    className="w-[195px] h-[50px] gap-1 rounded-lg border p-[14px] px-[30px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleLinkConfirm(method.key)}
                    className="w-[195px] h-[50px] gap-1 rounded-lg p-[14px] px-[30px] bg-gray-200"
                  >
                    Link
                  </button>
                </div>
              </div>
            )}

            {/* Show linked UPI ID text under the image after linking */}
            {linkedUpis[method.key] && !upiState[method.key].showInput && (
              <p className="mt-1 text-black text-sm font-medium font-inter">
                (UPI ID: {linkedUpis[method.key]})
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWallet;
