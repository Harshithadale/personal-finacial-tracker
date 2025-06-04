import React, { useEffect, useState } from "react";
import Header from "../components/Header/index.js";
import Cards from "../components/Cards/index.js";
import ExpenseModal from "../components/Modal/ExpenseModal/index.js";
import IncomeModal from "../components/Modal/IncomeModal/index.js";
import moment from "moment";
import { auth, db } from "../firebase.js";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import TransactionsTable from "../components/TransactionsTable/index.js";
import ChartComponent from "../components/Charts/index.js";
import NoTransactions from "../components/NoTransactions/index.js";
import { deleteDoc,doc } from "firebase/firestore";


function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const hideExpenseModal = () => {
    setIsExpenseModalVisible(false);
  };
  const hideIncomeModal = () => {
    setIsIncomeModalVisible(false);
  };
  const onFinish = (values, type) => {
    const newTransactions = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransactions(newTransactions);
  };
  async function addTransactions(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) toast.success("Transaction Added!");
      let newArray = transactions;
      newArray.push(transaction);
      setTransactions(newArray);
      calculateBalance();
    } catch (e) {
      if (!many) toast.error("Couldn't add transaction!");
    }
  }
  useEffect(() => {
    fetchTransactions();
  }, [user]);
  useEffect(() => {
    calculateBalance();
  }, [transactions]);
  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;
    let currentBalane = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
      currentBalane = incomeTotal - expenseTotal;
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(currentBalane);
  }
  async function resetTransactions() {
  setIncome(0);
  setExpense(0);
  setTotalBalance(0);
  setTransactions([]);

  try {
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);

    // Delete each transaction document
    const deletePromises = querySnapshot.docs.map((document) =>
      deleteDoc(doc(db, `users/${user.uid}/transactions`, document.id))
    );

    await Promise.all(deletePromises);
    toast.success("All transactions have been deleted!");
  } catch (error) {
    toast.error("Failed to reset transactions!");
    console.error("Error resetting transactions: ", error);
  }
}

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      setTransactions(transactionArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }
  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div>
      <Header />

      {loading ? (
        <p>loading...</p>
      ) : (
        <>
       <Cards
            showIncomeModal={showIncomeModal}
            showExpenseModal={showExpenseModal}
            income={income}
            expense={expense}
            totalBalance={totalBalance} resetTransactions={resetTransactions}
          />
          {transactions.length != 0 ? (
            <ChartComponent sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <ExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            hideExpenseModal={hideExpenseModal}
            onFinish={onFinish}
          />
          <IncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            hideIncomeModal={hideIncomeModal}
            onFinish={onFinish}
          />
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransactions}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
