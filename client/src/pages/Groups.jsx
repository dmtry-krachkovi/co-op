import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset, getGroups } from "../features/groups/groupSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import Group from "../components/Group";
import GroupForm from "../components/GroupForm";

// this is the homepage (displays all groups that the user belongs to)
function Groups() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modal = useRef();

  const { user } = useSelector((state) => state.auth);
  const { groups, isLoading, isSuccess, isError, message } = useSelector(
    (store) => store.groups
  );

  useEffect(() => {
    if (isError) {
      message !== "Cannot read properties of null (reading 'token')" &&
        toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGroups());

    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  const closeModal = () => {
    modal.current.close();
  };

  return (
    <>
      <div
        title="Create group"
        className="addGroup"
        onClick={() => modal.current.showModal()}
      >
        <i className="fa-solid fa-circle-plus"></i>
      </div>
      <dialog ref={modal}>
        <GroupForm closeModal={closeModal} />
      </dialog>
      <div className="groups-container">
        {groups.length > 0 ? (
          groups.map((group) => (
            <Link key={group._id} to={`/groups/${group._id}`}>
              <Group
                name={group.name}
                members={group.members.length}
                wallet={group.wallet}
                currency={group.currency}
                role={
                  (user ? user._id : "") === group.createdBy
                    ? "admin"
                    : "member"
                }
              />
            </Link>
          ))
        ) : (
          <p className="not_found">You don't belong to any group</p>
        )}
      </div>
    </>
  );
}

export default Groups;
