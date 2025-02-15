/*
 * Copyright 2020, 20212 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom/extend-expect';
import fetch, { FetchMock } from 'jest-fetch-mock';
import storageMock from 'unit-test/local-storage';
import { mockCookie } from './unit-test/cookie';
import 'mutationobserver-shim';
import MockIntersectionObserver from 'unit-test/MockIntersectionObserver';

export const DEFAULT_TEST_BASE_URL = 'http://localhost:8000';

Object.assign(window, {
  CHARLESCD_ENVIRONMENT: {
    REACT_APP_API_URI: DEFAULT_TEST_BASE_URL,
    REACT_APP_AUTH_URI: `${DEFAULT_TEST_BASE_URL}/keycloak`,
    REACT_APP_CHARLES_VERSION: '0.6.1',
    REACT_APP_CIRCLE_MATCHER_URL: `${DEFAULT_TEST_BASE_URL}/circle-matcher`
  }
});

beforeEach(() => {
  (fetch as FetchMock).resetMocks();
});

interface CustomDocument {
  cookie?: string;
}

export interface CustomGlobal {
  fetch: any;
  localStorage?: object;
  document?: CustomDocument;
  Worker: object;
}

export const originalFetch = window.fetch as FetchMock;

declare const global: CustomGlobal;

mockCookie();

class Worker {
  addEventListener = jest.fn();
  postMessage = jest.fn();
  terminate = jest.fn();
}

global.Worker = Worker;
window.URL.createObjectURL = jest.fn();

global.fetch = fetch as FetchMock;
global.localStorage = storageMock();
global.document.cookie = '';

Object.assign(navigator, {
  clipboard: {
    writeText: () => undefined
  }
});

window.IntersectionObserver = MockIntersectionObserver;
