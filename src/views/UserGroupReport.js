/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { addHours } from "date-fns";
import { useMutation } from "react-query";
import { UserGroupResults } from "../components/userGroup/userGroupResults";
import { UserGroupReportForm } from "../components/userGroup/userGroupForm";
import { getUserIds, getUserStats } from "../queries/getUserStats";

export const UserGroupReport = () => {
  const [users, setUsers] = useState();

  const [formError, setFormError] = useState(null);
  const [userIds, setUserIds] = useState();

  const [formData, setFormData] = useState({
    startDate: addHours(new Date(), -1),
    endDate: new Date(),
    usernames: "",
    mapathonHashtags: "",
  });

  const { mutate, isLoading } = useMutation(getUserIds, {
    onSuccess: (result) => {
      setUserIds(result);
    },
    onError: (error) => {
      if (error.response.status === 500) {
        setFormError(error.response.data);
      } else {
        setFormError(error.response.data.detail[0]["msg"]);
      }
    },
  });

  const fetchUserStats = useCallback(
    (ids) => {
      ids.map((i) =>
        getUserStats(i.userId, formData)
          .then((res) => {
            setUsers((oldUsersArray) => [
              ...oldUsersArray,
              { ...i, stats: res },
            ]);
          })
          .catch((error) => {
            if (error.response.status === 500) {
              setFormError(error.response.data);
            } else {
              setFormError(error.response.data.detail[0]["msg"]);
            }
          })
      );
    },
    [formData]
  );

  useEffect(() => {
    if (userIds) {
      fetchUserStats(userIds);
    }
  }, [userIds]);

  return (
    <div>
      <UserGroupReportForm
        fetch={mutate}
        formData={formData}
        setFormData={setFormData}
        setUsers={setUsers}
        formError={formError}
        setFormError={setFormError}
      />
      {isLoading && (
        <div className="mx-auto text-center w-1/4 p-1 mt-5">Loading...</div>
      )}
      {users && users.length >= 0 && userIds && (
        <UserGroupResults
          users={users}
          loading={isLoading}
          startDate={formData.startDate}
          endDate={formData.endDate}
        />
      )}
    </div>
  );
};
