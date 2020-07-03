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

import styled from 'styled-components';

const lineHeight = '40px';

const Content = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  width: calc(100% - 20px);
  background: ${({ theme }) => theme.metrics.dashboard.card};
`;

const TableHead = styled.div`
  display: flex;
  height: ${lineHeight};

  > div {
    display: flex;
    align-items: center;
    flex: 1;
  }
`;

export default {
  Content,
  TableHead
};
