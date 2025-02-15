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

import React from 'react';
import startsWith from 'lodash/startsWith';
import { useHistory } from 'react-router';
import Text from 'core/components/Text';
import { getActiveMenuId } from 'core/utils/menu';
import Styled from './styled';

export interface Props {
  id: string;
  icon: string;
  name: string;
  path: string;
}

const MenuItem = ({ id, icon, name, path }: Props) => {
  const history = useHistory();
  const activeMenuId = getActiveMenuId();
  const isActive = (id: string) => startsWith(activeMenuId, id);

  return (
    <Styled.Link
      onClick={() => history.push(path)}
      isActive={isActive(id)}
      data-testid={`menu-item-link-${name}`}
    >
      <Styled.ListItem icon={icon} isActive={isActive(id)}>
        <Text tag="H4" color="light">{name}</Text>
      </Styled.ListItem>
    </Styled.Link>
  );
};

export default MenuItem;
