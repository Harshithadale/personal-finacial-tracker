import React, { useState } from "react";
import { Select, Table } from "antd";
import Button from "../Button";
import Input from "../Input";
import { Option } from "antd/es/mentions";
import { Radio } from "antd";
import { Papa, parse } from "papaparse";
import { unparse } from "papaparse";
import searchImg from "../../assets/search-icon.svg";
import { parseActionCodeURL } from "firebase/auth";
import { toast } from "react-toastify";
function TransactionsTable({
  transactions,
  addTransaction,
  fetchTransactions,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  let filteredTransactions = transactions.filter((item) => {
    return (
     (item.name || "").toLowerCase().includes(search.toLowerCase()) &&
    (item.type || "").includes(typeFilter)
    );
  });
  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  function exportToCsv() {
    var csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  function importToCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          console.log(results);
          for (const transaction of results.data) {
            console.log("transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All trasactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <>
      <div className="main-input-flex">
        <div className="input-flex">
          <img src={searchImg} className="search-icon" />
          <input
            value={search}
            placeholder="Search by name"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="transaction-table">
        <h2>My Transactions</h2>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort By Date</Radio.Button>
          <Radio.Button value="amount">Sort By Amount</Radio.Button>
        </Radio.Group>
        <div className="export-class">
          <Button text="Export to CSV" blue={false} onClick={exportToCsv} />
          <label for="importCSV">
            <Button text="Import from CSV" blue={true}/>
          </label>
          <input
            type="file"
            accept=".csv"
            id="importCSV"
            onChange={importToCsv}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <Table dataSource={filteredTransactions} columns={columns} />
    </>
  );
}

export default TransactionsTable;
