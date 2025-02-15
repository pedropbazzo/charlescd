/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useCallback, useEffect, useState } from 'react';
import { create, detach, findByName, findAll } from 'core/providers/userGroup';
import { findAll as findAllRoles } from 'core/providers/roles';
import { addConfig } from 'core/providers/workspace';
import { useFetch, FetchProps, useFetchData, FetchStatuses } from 'core/providers/base/hooks';
import { toogleNotification } from 'core/components/Notification/state/actions';
import { useDispatch } from 'core/state/hooks';
import { UserGroup, GroupRoles, Role } from './interfaces';
import { ALREADY_ASSOCIATED_MESSAGE, ALREADY_ASSOCIATED_CODE } from './constants';

type DeleteUserGroup = {
  remove: (id: string, groupId: string) => Promise<Response>;
  status: FetchStatuses;
}
export const useDeleteUserGroup = (): DeleteUserGroup => {
  const detachUserGroup = useFetchData<Response>(detach);
  const [status, setStatus] = useState<FetchStatuses>("idle");
  const dispatch = useDispatch();

  const remove = async (id: string, groupId: string) => {
    try {
      setStatus("pending");
      const res = await detachUserGroup(id, groupId);
      setStatus("resolved");
      dispatch(
        toogleNotification({
          text: 'Success deleting user group',
          status: 'success'
        })
      );
      return res;
    } catch (e) {
      setStatus("rejected");
      dispatch(
        toogleNotification({
          text: `[${e.status}] User Group could not be removed.`,
          status: 'error'
        })
      );
    }
  }

  return {
    remove,
    status
  }
}

export const useUserGroup = (): FetchProps => {
  const dispatch = useDispatch();
  const [createData, createUserGroup] = useFetch<GroupRoles>(create);
  const findUserGroupByName = useFetchData<{ content: UserGroup[] }>(
    findByName
  );
  const [userGroupsData, getUserGroups] = useFetch<{ content: UserGroup[] }>(
    findAll
  );
  const [addData] = useFetch(addConfig);
  const [delData, detachGroup] = useFetch(detach);
  const {
    loading: loadingSave,
    response: responseSave,
    error: errorSave
  } = createData;
  const { loading: loadingAll, response, error } = userGroupsData;
  const { loading: loadingAdd, response: responseAdd } = addData;
  const {
    loading: loadingRemove,
    response: responseRemove,
    error: errorRemove
  } = delData;

  const save = useCallback(
    (id: string, roleId: string) => {
      createUserGroup(id, roleId);
    },
    [createUserGroup]
  );

  useEffect(() => {
    if (errorSave) {
      (async () => {
        const e = await errorSave.json();
        let code: string | number = ALREADY_ASSOCIATED_CODE;
        let message = ALREADY_ASSOCIATED_MESSAGE;

        if (e?.code === ALREADY_ASSOCIATED_CODE) {
          code = 422;
        }

        if (e?.message === ALREADY_ASSOCIATED_MESSAGE) {
          message = 'Group already associated to this workspace';
        }

        dispatch(
          toogleNotification({
            text: `[${code}] ${message}`,
            status: 'error'
          })
        );
      })();
    }
  }, [errorSave, dispatch]);

  const getAll = useCallback(() => {
    getUserGroups();
  }, [getUserGroups]);

  useEffect(() => {
    if (error) {
      dispatch(
        toogleNotification({
          text: `[${error.status}] User Group could not be fetched.`,
          status: 'error'
        })
      );
    }
  }, [error, dispatch]);

  const remove = useCallback(
    (id: string, groupId: string) => {
      detachGroup(id, groupId);
    },
    [detachGroup]
  );

  useEffect(() => {
    if (errorRemove) {
      dispatch(
        toogleNotification({
          text: `[${errorRemove.status}] User Group could not be removed.`,
          status: 'error'
        })
      );
    }
  }, [errorRemove, dispatch]);

  useEffect(() => {
    if (responseRemove) {
      dispatch(
        toogleNotification({
          text: 'Success deleting user group',
          status: 'success'
        })
      );
    }
  }, [responseRemove, dispatch]);

  return {
    getAll,
    findUserGroupByName,
    save,
    remove,
    responseAdd,
    responseAll: response?.content,
    responseSave,
    responseRemove,
    loadingAdd,
    loadingAll,
    loadingRemove,
    loadingSave
  };
};

export const useRole = (): FetchProps => {
  const [rolesData, getRoles] = useFetch<{ content: Role[] }>(findAllRoles);
  const { loading: loadingAll, response } = rolesData;

  const getAll = useCallback(() => {
    getRoles();
  }, [getRoles]);

  return {
    getAll,
    loadingAll,
    responseAll: response?.content
  };
};
