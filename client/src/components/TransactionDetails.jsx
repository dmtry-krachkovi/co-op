import { deleteTransaction } from "../features/groups/currentGroupSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// when a transaction is clicked, this component will show
function TransactionDetails({ transaction, closeModal, currency }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction({ groupId: id, transactionId }));
  };
  const handleCancel = () => {
    closeModal();
  };
  return (
    <div className="transaction_details">
      <p>
        Name: <b>{transaction.name}</b>
      </p>
      <p>
        Amount:{" "}
        <b>
          {new Intl.NumberFormat(currency === "LBP" ? "de-DE" : "en-US", {
            style: "currency",
            currency,
          }).format(Math.abs(transaction.amount))}
        </b>
      </p>
      <p>
        Type: <b>{transaction.amount < 0 ? "Outcome" : "Income"}</b>{" "}
      </p>
      <p>
        Posted by: <b>{transaction.postedBy}</b>
      </p>
      <p>
        Posted at:{" "}
        <b>{new Date(transaction.createdAt).toLocaleString("en-GB")}</b>
      </p>
      <div className="button_container">
        <button
          className="delete"
          onClick={() => handleDelete(transaction._id)}
        >
          Delete
        </button>
        <button
          className="cancel"
          onClick={() => handleCancel(transaction._id)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TransactionDetails;
