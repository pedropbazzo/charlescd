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

import { DEFAULT_PAGE_SIZE } from 'core/constants/request';
import { buildParams, URLParams } from 'core/utils/query';
import { baseRequest, postRequest } from './base';

const endpoint = '/moove/v2/modules';

export interface Component {
  name: string;
  errorThreshold: number;
  latencyThreshold: number;
}

export interface ModuleSave {
  name: string;
  helmRepository: string;
  gitRepositoryAddress: string;
  components: Component[];
}

const initialModulesFilter: ModulesFilter = {
  name: '',
  page: 0
};

export interface ModulesFilter {
  name?: string;
  page?: number;
}

export const findAll = (filter: ModulesFilter = initialModulesFilter) => {
  const params = new URLSearchParams({
    size: `${DEFAULT_PAGE_SIZE}`,
    name: filter?.name || '',
    page: `${filter.page ?? 0}`
  });

  return baseRequest(`${endpoint}?${params}`);
};

export const findById = (id: string) => baseRequest(`${endpoint}/${id}`);

export const create = (module: ModuleSave) =>
  postRequest(`${endpoint}`, module);

export const update = (id: string, module: ModuleSave) =>
  baseRequest(`${endpoint}/${id}`, module, { method: 'PUT' });

export const deleteModule = (id: string) =>
  baseRequest(`${endpoint}/${id}`, {}, { method: 'DELETE' });

export const createComponent = (moduleId: string, component: Component) =>
  baseRequest(`${endpoint}/${moduleId}/components`, component, {
    method: 'POST'
  });

export const updateComponent = (
  moduleId: string,
  componentId: string,
  component: Component
) =>
  baseRequest(`${endpoint}/${moduleId}/components/${componentId}`, component, {
    method: 'PUT'
  });

export const deleteComponent = (moduleId: string, componentId: string) =>
  baseRequest(
    `${endpoint}/${moduleId}/components/${componentId}`,
    {},
    {
      method: 'DELETE'
    }
  );

export const findComponentTags = (
  moduleId: string,
  componentId: string,
  params: URLParams
) =>
  baseRequest(
    `${endpoint}/${moduleId}/components/${componentId}/tags?${buildParams(
      params
    )}`
  );
